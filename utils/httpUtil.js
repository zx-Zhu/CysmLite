var baseUrl = 'https://betterzzx.com'
const app = getApp()
module.exports = {
  getStus: function (content, cb) {
    var that = this
    var url
    if (containsNumber(content)) {
      url = baseUrl + '/cqupt/getStu?id=' + content + '&user=' + app.globalData.userInfo.nickName
    } else {
      url = baseUrl + '/cqupt/getStu?name=' + content + '&user=' + app.globalData.userInfo.nickName
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

  

}

function containsNumber (str) {
  var b = /\d/;
  return b.test(str);
}

