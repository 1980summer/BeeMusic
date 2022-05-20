// pages/detail-search/index.js
import { getSearchHot } from '../../service/api-search'
Page({

    data: {
        hotKeyWords: []
    },
    onLoad(options) {
        // 1 获取页面的数据
        this.getPageData()
    },

    // 封装一个函数
    getPageData: function () {
        getSearchHot().then(res => {
            this.setData({ hotKeyWords: res.result.hots })
        })

    }
})