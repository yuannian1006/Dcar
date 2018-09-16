//app.js
App({



  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)





    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://jsxsdqc.com:8188/xxl-auth/system/user/login',
    //         data: {
    //           code: res.code
    //         },
    //         success: function (data) {
    //           console.log(data);
    //         },
    //         fail: function (res) {
    //           console.log(res)



    
    //         }
    //       })
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // })

  },

  globalData: {
    /*** 开发环境地址  ***/
   apiUrl: 'https://localhost',
    // apiUrl: 'http://localhost:8188/xxl-auth',
    // apiUrl: 'http://47.96.94.63:8188/xxl-auth',

    /*** 正式环境地址  ***/
    // apiUrl: 'https://jsxsdqc.com',

    /*** 确证  ***/
    userInfo: null,
    token: null,
    openid: null,
    
    /*** 用户信息 ***/
    tsSysUserId:null,
    no: null,
    name: null, //姓名
    email: null,//邮箱
    mobile: null,//手机号
    status: null,//启用禁用
    imgUrl: null,//图片地址
    userStatus: null,//用户状态
    userType: null,//用户类型
    points: null,//积分
    sex: null,//性别
   
    /*** 业务场景需要用字段 ***/
   

  },

  debugger: false
})