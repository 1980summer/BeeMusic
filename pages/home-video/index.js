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
  onLoad: function (options) {
    // const _this = this
    getTopMVs(0).then(res => {
      this.setData({ topMVs: res.data })
      console.log(res.data)
    })
    // ===================================================================
    // beeRequest.get("/top/mv", { offset: 0, limit: 10 }).then(res => {
    //   this.setData({ topMVs: res.data })
    //   console.log(res.data)

    // })
    // =================================================
    // wx.request({
    //     url: 'http://123.207.32.32:9001/top/mv',
    //     data: {
    //         offset: 0,
    //         limit: 10
    //     },
    //     success: function (res) {
    //         _this.setData({ topMVs: res.data.data })
    //         console.log(res)
    //     }
    // })
    // ======================================================
  }
})

