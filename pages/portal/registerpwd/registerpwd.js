var app = getApp();
Page({
  data: {
    name: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    if (app.globalData.no == null) {
        //wx.navigateTo({url:"../../portal/login/login"})
      
      // wx.redirectTo({ url: "../portal/login/login" })
    } else {
      console.log(" 触发了用户中心的onLoad事件",)
      this.setData({ name: app.globalData.name })



    }


  },

  click: function (e) {

  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    console.log("用户中心的导航 被点击")
    wx.redirectTo ({ url: "../../index/index" })
  },
  /**
   * 查看行程
   */
  ordClick: function () {
    console.log("查看行程")
    wx.navigateTo({ url: "../order/order" })
  },

  /**
 * 点击去我的钱包
 */
  walClick: function () {
    console.log("点击去我的钱包")
    wx.navigateTo({ url: "../wallet/wallet" })
  },


/**
 * 点击去设置
 */
  setClick: function() {
    console.log("点击去设置")
   // wx.navigateTo({ url: "../usrconfig/usrconfig" })
  }
})