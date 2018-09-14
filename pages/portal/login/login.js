var app = getApp();
var openId = (wx.getStorageSync('openId'));

Page({
  data: {
    code: "",
    no: "", //前端的用户名
    password: "", //前端的密码
  },

  noInput: function (e) {
    this.setData({
      no: e.detail.value
    })
  },

  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 点击登录
   */
  loginAction: function () {
    console.log("用户尝试登陆")
    var no = this.data.no;
    var password = this.data.password;

    console.log("用户编号" + no, "密码", password);

    if (no.replace(/\s+/g, '') == "" || password.replace(/\s+/g, '') == "" || no == null || password == null) {
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }

    //加载提示框
    wx.request({
      method: "POST",
      url: app.globalData.apiUrl + '/login',
      data: {
        no: no,
        password: password
      },
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log("登录的res", res)
        var code = res.data.code;
        console.log(res.data.results.tsSysUserId);
        if (code == 10000) {
          // 后台传递过来的值
          var tsSysUserId = res.data.results.tsSysUserId;//用户ID
          var no = res.data.results.no;//用户编号
          var token = res.data.results.token;//token
          var name = res.data.results.name;
          var email = res.data.results.email;
          var mobile = res.data.results.mobile;
          var status = res.data.results.status;
          var imgUrl = res.data.results.imgUrl;
          var userStatus = res.data.results.userStatus;
          var userType = res.data.results.userType;
          var points = res.data.results.points;
          var sex = res.data.results.sex;

          // 设置全局变量的值
          app.globalData.tsSysUserId = tsSysUserId;
          app.globalData.no = no;
          app.globalData.token = token;
          app.globalData.name = name;
          app.globalData.email = email;
          app.globalData.mobile = mobile;
          app.globalData.status = status;
          app.globalData.imgUrl = imgUrl;
          app.globalData.userStatus = userStatus;
          app.globalData.userType = userType;
          app.globalData.points = points;
          app.globalData.sex = sex;

          // 将token存储到本地
          wx.setStorageSync('tsSysUserId', tsSysUserId);
          wx.setStorageSync('no', no);
          wx.setStorageSync('token', token);
          wx.setStorageSync('name', name);
          wx.setStorageSync('email', email);
          wx.setStorageSync('mobile', mobile);
          wx.setStorageSync('status', status);
          wx.setStorageSync('imgUrl', imgUrl);
          wx.setStorageSync('userStatus', userStatus);
          wx.setStorageSync('userType', userType);
          wx.setStorageSync('points', points);
          wx.setStorageSync('sex', sex);


          // 切换到首页
          console.log("登录成功即将切换到首页")
          // wx.redirectTo({ url: "../../index/index" })
          /**
           * YN解决有返回箭头的问题
           */
          wx.reLaunch({
            url: '../../index/index',
          })
        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
      },
      fail: function () {

      }
    })
  },

  /**
   * 去注册
   */
  toReg: function () {
    console.log("用户要去注册了")
    wx.navigateTo({ url: "../register/register" })
  },

  /**忘记密码 */
  toForgotpwd: function () {
    console.log("用户要去注册了")
    wx.navigateTo({ url: "../updatepwd/updatepwd" })
  }

})