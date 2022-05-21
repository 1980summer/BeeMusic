// base-ui/nav-bar/index.js
Component({
    // 小程序里使用多个插槽必须要配置这个选项
    options: {
        multipleSlots: true
    },
    properties: {
        title: {
            type: String,
            value: "默认标题"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 在全局获取数据
        statusBarHeight: getApp().globalData.statusBarHeight
    },

    methods: {

    }
})
