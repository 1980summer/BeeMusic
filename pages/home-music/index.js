// pages/home-page/index.js
import { getBanners } from "../../service/api_music"
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

// 把查询的函数放到节流函数里，生成一个新函数
const throttleQueryRect = throttle(queryRect)

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