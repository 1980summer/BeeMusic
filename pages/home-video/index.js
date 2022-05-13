// pages/home-video/index.js
import { getTopMVs } from '../../service/api_video'
// import beeRequest from '../../service/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topMVs: {}
    },

    /**
     * 生命周期函数--监听页面加载(created)
     */
    onLoad: async function (options) {
        const res = await getTopMVs(0)
        this.setData({ topMVs: res.data })
        // console.log(res)

    }
})

