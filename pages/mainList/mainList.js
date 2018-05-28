// pages/mainList.js
var httpUtil = require('../../utils/httpUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    data: [],
    message: '',
    status: 0,
    count: 0,
    stuId: '',
    showModal: false,
    showLoading: true,
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      content: options.content
    })
    httpUtil.getStus.call(that, that.data.content, function (result) {

      that.setData({
        showLoading: false,
        data: result.data,
        message: result.message,
        count: result.count
      })
    })
  },
  // viewDetail: function (e) {
  //   var ds = e.currentTarget.dataset;
  //   console.log(ds.id)
  //   wx.navigateTo({
  //     url: '../detail/detail?id=' + ds.id
  //   })
  // },
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
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.hideModal();
  },
  
  /**
     * 弹窗
     */
  jumpBtn: function (e) {
    var that = this
    var ds = e.currentTarget.dataset;
    console.log(ds.id)
    wx.getStorage({
      key: 'hasVerified',
      success: function (res) {
        if (res.data = 'true') {
          wx.navigateTo({
            url: '../detail/detail?id=' + ds.id
          })
        } else {
          that.setData({
            showModal: true,
            stuId: ds.id
          })
        }
      },
      fail: function () {
        that.setData({
          showModal: true,
          stuId: ds.id
        })
      }
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    if (this.data.key == 'zxisthebest') {
      wx.setStorage({
        key: "hasVerified",
        data: "true"
      })
      this.hideModal();
      console.log(this.data.stuId)
      wx.navigateTo({
        url: '../detail/detail?id=' + this.data.stuId
      })
    } else {
      wx.showToast({
        title: '不知道就不要乱试哦',
        icon: 'none',
        duration: 2000
      })
    }
  },
  inputKey: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  jumpCourse: function (e) {
    var ds = e.currentTarget.dataset;
    console.log(ds.id)
    wx.navigateTo({
      url: '../kebiao/kebiao?id=' + ds.id + '&offset=0' + '&name=' + ds.name
    })
  }
})