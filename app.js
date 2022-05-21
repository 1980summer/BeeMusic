// app.js
App({
    onLaunch: function () {
        // 获取系统信息
        const info = wx.getSystemInfoSync()
        this.globalData.statusBarHeight = info.statusBarHeight
    },

    globalData: {
        statusBarHeight: 0
    }

})
