// pages/home-page/index.js
Page({


    data: {

    },


    onLoad(options) {

    },

    // 事件处理
    handleSearchClick: function () {
        wx.navigateTo({
            url: '/pages/detail-search/index',
        })
    },

    onUnload() {

    },


})