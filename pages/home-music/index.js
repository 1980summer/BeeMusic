// pages/home-page/index.js
import { getBanners, getSongMenu } from "../../service/api_music"
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
import { rankingStore, rankingMap } from '../../store/index'

// 把查询的函数放到节流函数里，生成一个新函数
const throttleQueryRect = throttle(queryRect)

Page({

    data: {
        swiperHeight: 0,
        banners: [],
        hotSongMenu: [],
        recommendSongMenu: [],
        recommendSongs: [],
        rankings: { 0: {}, 2: {}, 3: {} }
    },


    onLoad(options) {
        // 获取页面数据
        this.getPageData()

        // 发起获取共享数据的请求
        rankingStore.dispatch("getRankingDataAction")
        // 从store中获取共享的数据
        rankingStore.onState("hotRanking", (res) => {
            if (!res.tracks) return
            const recommendSongs = res.tracks.slice(0, 6)
            this.setData({ recommendSongs: recommendSongs })
            // 或者简写： this.setData({ recommendSongs })

        })
        rankingStore.onState("newRanking", this.getRankingHandler(0))
        rankingStore.onState("originRanking", this.getRankingHandler(2))
        rankingStore.onState("upRanking", this.getRankingHandler(3))

    },
    // 网络请求
    getPageData: function () {
        getBanners().then(res => {
            this.setData({ banners: res.banners })
        })

        getSongMenu().then(res => {
            this.setData({ hotSongMenu: res.playlists })
        })

        getSongMenu("华语").then(res => {
            this.setData({ recommendSongMenu: res.playlists })
        })
    },



    // 事件处理
    handleSearchClick: function () {
        wx.navigateTo({
            url: '/pages/detail-search/index',
        })
    },
    // 获取图片的高度（如何去获取某一个组件的高度）
    handleSwiperImageLoaded: function () {
        // 使用新生成的节流函数
        throttleQueryRect(".swiper-image").then(res => {
            const rect = res[0]
            this.setData({ swiperHeight: rect.height })
        })
    },
    // 点击去往歌单详情
    handleMoreClick: function () {
        this.navigateToDetailSongPage("hotRanking")
    },
    handleRankingItemClick: function (event) {
        const idx = event.currentTarget.dataset.idx
        const theRankingName = rankingMap[idx]
        this.navigateToDetailSongPage(theRankingName)
    },
    navigateToDetailSongPage: function (rankingName) {
        wx.navigateTo({
            // 带着参数传到新页面去
            url: `/pages/detail-songs/index?ranking=${rankingName}`,
        })
    },

    onUnload() {

    },

    getRankingHandler: function (idx) {
        // 高阶函数：函数本身又返回一个函数， 可以避免重复逻辑
        return (res) => {
            if (Object.keys(res).length === 0) return
            const name = res.name
            const coverImgUrl = res.coverImgUrl
            const playCount = res.playCount
            const songList = res.tracks.slice(0, 3)
            const rankingObj = { name, coverImgUrl, playCount, songList }
            const newRankings = { ...this.data.rankings, [idx]: rankingObj } // 浅拷贝
            this.setData({
                rankings: newRankings
            })
            // console.log(this.data.rankings)
        }

    }

})