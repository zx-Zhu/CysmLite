var baseUrl = 'https://betterzzx.com'
const app = getApp()
module.exports = {
  getStus: function (content, cb) {
    var that = this
    var url
    if (containsNumber(content)) {
      url = baseUrl + '/cqupt/getStu?id=' + content + '&user=重邮生命：' + app.globalData.userInfo.nickName + '@' + app.globalData.userInfo.city + '@' + app.globalData.userInfo.gender
    } else {
      url = baseUrl + '/cqupt/getStu?name=' + content + '&user=重邮生命：' + app.globalData.userInfo.nickName + '@' + app.globalData.userInfo.city + '@' + app.globalData.userInfo.gender
    }
    wx.request({
      url: url,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        var data = res.data
        that.setData({
          data: that.data.data,
          message: that.data.message,
          status: that.data.status,
          count: that.data.count
        })
        cb(data)
      }
    })
  },
  getCourse: function (stuId, offset, cb) {
    var that = this
    var url
    url = baseUrl + '/cqupt/getCourse?stuId=' + stuId + '&offset=' + offset
    wx.request({
      url: url,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        var data = res.data
        that.setData({
          data: that.data.data,
          message: that.data.message,
          count: that.data.count,
          extra: that.data.extra
        })
        cb(data)
      }
    })
  }



}

function containsNumber(str) {
  var b = /\d/;
  return b.test(str);
}

