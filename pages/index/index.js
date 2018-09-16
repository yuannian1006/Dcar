var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据  curtTab 【0 协议客户 1 临时客户】
   * curtList 0 单程 1 包车 2 接机 3 送机
   * index 用车类型
   */
  data: {
    navbar: ['协议客户', '临时客户'],
    items: ['单程车', '包车', '接机', '送机'],
    curtTab: 0,
    curtList: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    array: ['5座公务轿车', '7座商务车', '5座豪华车', '19座考斯特', '45座豪华大巴', '豪华婚车'],
    date: util.formatTime(new Date), //用车日期
    time: util.formatTime2(new Date()), //用车时间
    index: 0, //车型
    startLocation: "", //上车地点
    endLocation: "", //下车地点
    viaLocation: "", //途径行程
    phoneNo: "", //获取机上的联系人号码
    slatitude: "", //上车维度   后续定义为一个对象{}
    slongitude: "", //上车经度
    elatitude: "", //下车维度
    elongitude: "", //下车经度
    notes: "", //提交订单时的备注

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({

      success: function (res) {
        console.log("************", res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },

      fail: function (res) {
        console.log(333333);
        console.log(res);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("主页onUnload事件 被触发")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击头像跳转至用户中心
   */
  toUsrHome: function () {
    if (app.globalData.no == null) {
      // wx.navigateTo({url:"../login/login"})
      console.log("这是点击头像 但无用户信息 指示用户到登录页面登录")
      // wx.redirectTo({ url: "../portal/login/login" })
      wx.navigateTo({
        url: "../portal/login/login"
      })
    } else {


      console.log("这是点击头像 跳转到用户中心")
      wx.navigateTo({
        url: "../home/user/user"
      })

    }
  },
  /**
   * 点击时把数组的index给curtTab
   */
  navbarTap: function (e) {
    this.setData({
      curtTab: e.currentTarget.dataset.idx
    })
    console.log(e)
  },

  navbarTap1: function (e) {
    console.log("到这里了")
    // console.log(curtList)
    this.setData({
      curtList: e.currentTarget.dataset.idx
    })
    console.log(e)
  },

  /**
   * 订单提交,若无登录用户信息,调到登录页面,若用户信息
   * 正常则提交
   */
  xyFormSubmit: function (e) {

    console.log("协议订单提交");
    console.log(e);

    //
    util.isNull(e.detail.value.onLocation);
    util.isNull(e.detail.value.viaLocation);
    util.isNull(e.detail.value.offLocation);
    util.isNull(e.detail.value.byCustomerName);

    console.log("是否有值1 " + app.globalData.isOk)


    //YN 手机号码校验
    var phone = this.data.phoneNo
    if (phone == '') {
      wx.showToast({
        title: '手机号不能为空',
      })
      app.globalData.isOk = false
      return false
    } else if (phone.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      app.globalData.isOk = false
      return false
    } 
    console.log("是否有值2 " + app.globalData.isOk)
    var myreg = /^(((1[0-9]{2})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      app.globalData.isOk = false
      return false;
    } 
    console.log("是否有值3 " + app.globalData.isOk)

    var userDateInit = this.data.date;
    var userTimeInit = this.data.time;
    var carTypeInit = this.data.array[this.data.index];
    var orderType = this.data.curtList;

    console.log("是否有值4 " + app.globalData.isOk)
    if (app.globalData.no == null) {

      wx.navigateTo({
        url: "../portal/login/login"
      })
    }
    console.log("***5 " + app.globalData.isOk)
    if (app.globalData.isOk) {
      console.log("测试单位");
      console.log("单位/个人 ", app.globalData.tsSysUserId);
      //加载提示框
      console.log("上车地点", this.data.startLocation)

      if (this.data.curtList == 0) {
        orderType = '单程车';
      } else if (this.data.curtList == 1) {
        orderType = '包车';
      } else if (this.data.curtList == 2) {
        orderType = '接机';
      } else if (this.data.curtList == 3) {
        orderType = '送机';
      }

      wx.request({


        method: "POST",
        // url: app.globalData.apiUrl + '/system/ppOrder/add',
        url: app.globalData.apiUrl + '/add',

        data: {
          userDate: this.data.date,
          userTime: this.data.time,
          onLocation: e.detail.value.onLocation,
          tuLocation: e.detail.value.viaLocation,
          offLocation: e.detail.value.offLocation,
          flightNumber: e.detail.value.flightNumber,
          byCustomerName: e.detail.value.byCustomerName,
          byCustomerPhone: e.detail.value.byCustomerPhone,
          carType: this.data.array[this.data.index],
          remark: e.detail.value.notes,
          orderType: orderType,
          orderStatus: '新建',
          orderSource: '小程序',
          serviceType: 'L',
          tsSysUserId: app.globalData.tsSysUserId

        },
        header: {
          'content-type': 'application/json',
          'Authorization': app.globalData.token
        },
        success: function (res) {
          console.log("提交成功的res", res)
          var code = res.data.code;
          if (code == 10000) {
            // 后台传递过来的值
            wx.showToast({
              title: '预定成功！！',
              icon: 'success',
              duration: 5000
            })

            wx.navigateTo({
              url: "../home/order/order"
            })

            // wx.navigateTo({ url: "../home/order/orderinit/orderinit?userDate=" + userDateInit + "&userTime=" + userTimeInit + "&carType=" + carTypeInit })
          } else {

          }
        },
        fail: function () {

        }
      })
    }

  },



  /**
   * 订单提交,若无登录用户信息,调到登录页面,若用户信息
   * 正常则提交
   */
  lsFormSubmit: function (e) {

    console.log("临客订单提交");
    console.log(e);

    //
    util.isNull(e.detail.value.lsOnLocation);
    util.isNull(e.detail.value.lsOffLocation);
    util.isNull(e.detail.value.viaLocation);
    util.isNull(e.detail.value.lsByCustomerName);

    console.log("奇怪1 " + e.detail.value.onLocation)
    console.log("奇怪2 " + e.detail.value.byCustomerName)


    console.log("是否有值1 " + app.globalData.isOk)

    //YN 手机号码校验
    var phone = this.data.phoneNo
    if (phone == '') {
      wx.showToast({
        title: '手机号不能为空',
      })
      app.globalData.isOk = false
      return false
    } else if (phone.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      app.globalData.isOk = false
      return false
    }

    var myreg = /^(((1[0-9]{2})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      app.globalData.isOk = false
      return false
    } 


    var userDateInit = this.data.date;
    var userTimeInit = this.data.time;
    var carTypeInit = this.data.array[this.data.index];
    var orderType = this.data.curtList;
    if (app.globalData.no == null) {

      wx.navigateTo({
        url: "../portal/login/login"
      })
    }

    if (app.globalData.isOk) {
      console.log("测试单位");
      console.log(app.globalData.tsSysUserId);
      //加载提示框

      if (this.data.curtList == 0) {
        orderType = '单程车';
      } else if (this.data.curtList == 1) {
        orderType = '包车';
      } else if (this.data.curtList == 2) {
        orderType = '接机';
      } else if (this.data.curtList == 3) {
        orderType = '送机';
      }
      wx.request({
        method: "POST",
        // url: app.globalData.apiUrl + '/system/ppOrder/add',

        url: app.globalData.apiUrl + '/add',


        data: {
          userDate: this.data.date,
          userTime: this.data.time,
          onLocation: e.detail.value.onLocation,
          tuLocation: e.detail.value.viaLocation,
          offLocation: e.detail.value.offLocation,
          flightNumber: e.detail.value.flightNumber,
          byCustomerName: e.detail.value.byCustomerName,
          byCustomerPhone: e.detail.value.byCustomerPhone,
          carType: this.data.array[this.data.index],
          remark: e.detail.value.notes,
          orderType: orderType,
          orderStatus: '新建',
          orderSource: '小程序',
          serviceType: 'L',
          tsSysUserId: app.globalData.tsSysUserId

        },
        header: {
          'content-type': 'application/json',
          'Authorization': app.globalData.token
        },
        success: function (res) {
          console.log("登录的res", res)
          var code = res.data.code;
          if (code == 10000) {
            // 后台传递过来的值

            wx.hideLoading()
            wx.showToast({
              title: '预定成功！！',
              icon: 'success',
              duration: 5000
            })

            // 切换到首页
            wx.navigateTo({
              url: "../home/order/order"
            })
            // wx.navigateTo({
            //   url: "../home/order/orderinit/orderinit?userDate=" + userDateInit + "&userTime=" + userTimeInit + "&carType=" + carTypeInit
            // })
          } else {

          }
        },
        fail: function () {

        }
      })
    }

  },



  /**
   * XXL 页面控制
   */

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  /**选择上车地点 */
  getOnLocation: function () {
    console.log("被点击")
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log("上车位置", res)
        that.setData({
          startLocation: res.name,
          slatitude: res.latitude, //下车维度
          slongitude: res.longitude //下车经度
        })
      },
    })
  },

  /**选择下车地点 */
  getOffLocation: function () {
    console.log("被点击")
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log("上车位置", res)
        that.setData({
          endLocation: res.name,
          elatitude: res.latitude, //下车维度
          elongitude: res.longitude, //下车经度
        })
      },
    })
    console.log("endLocation " + this.data.endLocation)
  },

  /**输入途径行程 getTuLocation*/


  /**获取输入的手机号码 */
  getPhoneNo: function (e) {
    this.setData({
      phoneNo: e.detail.value
    })
  }




})