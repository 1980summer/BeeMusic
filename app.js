// app.js
App({
    onLaunch: function () {
        // 获取系统信息
        const info = wx.getSystemInfoSync()
        this.globalData.screenWidth = info.screenWidth
        this.globalData.screenHeight = info.screenHeight
        this.globalData.statusBarHeight = info.statusBarHeight
    },

    globalData: {
        screenWidth: 0,
        screenHeight: 0,
        statusBarHeight: 0,
        navBarHeight: 44 // 这是最顶的导航栏的高度，就是显示时间和电量那一部分
    }

})
