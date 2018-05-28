// pages/kebiao/kebiao.js
var httpUtil = require('../../utils/httpUtil.js')
var offset = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    message: '',
    extra: '',
    count: 0,
    showLoading: true,
    hasThree: false,
    name: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this
    offset = options.offset
    this.setData({
      id: options.id,
      name: options.name
    })
    console.log(offset)
    httpUtil.getCourse.call(that, that.data.id, offset, function (result) {
      that.setData({
        showLoading: false,
        data: result.data,
        message: result.message,
        count: result.count,
        extra: result.extra
      })
    })
  },

  onLeftTap: function () {
    offset--;
    this.setData({
      showLoading: true
    })
    var that = this
    httpUtil.getCourse.call(that, that.data.id, offset, function (result) {
      that.setData({
        showLoading: false,
        data: result.data,
        message: result.message,
        count: result.count,
        extra: result.extra
      })
    })
  },

  onRightTap: function () {
    offset++;
    this.setData({
      showLoading: true
    })
    var that = this
    console.log(offset)
    httpUtil.getCourse.call(that, that.data.id, offset, function (result) {
      that.setData({
        showLoading: false,
        data: result.data,
        message: result.message,
        count: result.count,
        extra: result.extra
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.name + that.data.extra + '的课表',
      path: '/pages/kebiao/kebiao?id=' + that.data.id + '&offset=' + offset + '&name=' + that.data.name,
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