// pages/mainList.js
var httpUtil = require('../../utils/httpUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content : '',
    datas : [],
    message : '',
    status : 0,
    count : 0,
    showLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      content : options.content
    })
    httpUtil.getStus.call(that, that.data.content, function (result) {
      
      that.setData({ 
        showLoading : false,
        datas: result.data,
        message: result.message,
        count: result.count
      })
    })
  },
  viewDetail: function (e) {
    var ds = e.currentTarget.dataset;
    console.log(ds.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '重邮生命Lite',
      path: '/pages/index/index',
      imageUrl: '../res/logo.jpg',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'none',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})