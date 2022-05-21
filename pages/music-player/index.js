// pages/music-player/index.js
import { getSongDetail } from '../../service/api_player'
Page({
    data: {
        id: 0,
        currentSong: {},
        currentPage: 0,
        contentHeight: 0
    },
    onLoad(options) {
        // 1 获取传入的id
        const id = options.id
        this.setData({ id })

        // 2 根据id获取歌曲信息
        this.getPageData(id)

        // 3 动态计算内容高度
        const screenHeight = getApp().globalData.screenHeight
        const statusBarHeight = getApp().globalData.statusBarHeight
        const navBarHeight = getApp().globalData.navBarHeight
        const contentHeight = screenHeight - statusBarHeight - navBarHeight
        this.setData({ contentHeight: contentHeight })
    },

    // 网络请求
    getPageData: function (id) {
        getSongDetail(id).then(res => {
            this.setData({ currentSong: res.songs[0] })
        })
    },

    // 事件处理
    handleSwiperChange: function (event) {
        const current = event.detail.current
        this.setData({ currentPage: current })
    },


    onUnload() {

    }
})