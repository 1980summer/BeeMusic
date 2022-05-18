// pages/home-video/index.js
import { getTopMVs } from '../../service/api_video'
// import beeRequest from '../../service/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topMVs: [],
        hasMore: true
    },

    // 生命周期函数--监听页面加载(created)
    onLoad: async function (options) {
        // const res = await getTopMVs(0)
        // this.setData({ topMVs: res.data })
        // console.log(res)
        this.getTopMVData(0)
    },

    // 封装网络请求的方法（重点）
    getTopMVData: async function (offset) {
        // 判断是否可以请求
        if (!this.data.hasMore) return
        // 展示加载动画
        wx.showNavigationBarLoading()
        // 真正请求数据
        const res = await getTopMVs(offset)
        let newData = this.data.topMVs
        if (offset === 0) {
            newData = res.data
        } else {
            newData = newData.concat(res.data)
        }
        // 设置数据 
        this.setData({ topMVs: newData })
        this.setData({ hasMore: res.hasMore })
        wx.hideNavigationBarLoading()
        // 如果数据已经请求过来了就停止显示动画
        if (offset === 0) {
            wx.stopPullDownRefresh()
        }
    },

    // 封装事件处理的方法
    handleVideoItemClick: function (event) {
        // 获取 id
        const id = event.currentTarget.dataset.item.id
        // 页面跳转
        wx.navigateTo({
            url: `/pages/detail-video/index?id=${id}`
        })
    },

    // 其他的生命周期回调函数
    // 上拉刷新， 直接覆盖原来的数据
    onPullDownRefresh: async function () {
        this.getTopMVData(0)
        console.log('shangla')
    },
    onReachBottom: async function () {
        // 偏移量设置（offset）
        // 0~9
        // 10~19
        this.getTopMVData(this.data.topMVs.length)
    }

})
