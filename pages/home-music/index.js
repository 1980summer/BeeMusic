// pages/home-page/index.js
import { getBanners } from "../../service/api_music"
Page({


    data: {
        swiperHeight: 0,
        banners: []
    },


    onLoad(options) {
        // 获取页面数据
        this.getPageData()
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
    handleSwiperImageLoaded: function () {
        const query = wx.createSelectorQuery()
        query.select('.swiper-image').boundingClientRect()
        query.exec((res) => {
            const rect = res[0]
            this.setData({ swiperHeight: rect.height })
        })
    },

    onUnload() {

    },


})