// pages/home-page/index.js
import { getBanners } from "../../service/api_music"
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
import { rankingStore } from '../../store/ranking-store'

// 把查询的函数放到节流函数里，生成一个新函数
const throttleQueryRect = throttle(queryRect)

Page({



    data: {
        swiperHeight: 0,
        banners: [],
        recommendSongs: []
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
    },
    // 网络请求
    getPageData: function () {
        getBanners().then(res => {
            this.setData({ banners: res.banners })
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

    onUnload() {

    },


})