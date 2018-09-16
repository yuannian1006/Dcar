
var app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + 1
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-');
}

const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const day = date.getDate()
  var hour = date.getHours() + 2
  const minute = date.getMinutes()
  const second = date.getSeconds()

  /**YN   
   * 优化时间*/
  if (hour == 24) {
    hour = 0
  } else if (hour == 25) {
    hour = 1
  } else if (hour == 26) {
    hour = 2
  }

  return [hour, minute].map(formatNumber).join(':')
}

const formatTime3 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day, hour, minute, second].map(formatNumber).join('-');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isNull(msg){

  console.log("msg   =" + msg)
  if(msg == null || msg == ''){


    wx.showToast({
      title: '信息填写有误！',
      icon: 'fail',
      duration: 3000
    })
    console.log("*** " + app.globalData.isOk)
    app.globalData.isOk = false
    console.log("*** " + app.globalData.isOk)
    return false
  }else{
    app.globalData.isOk = true
    console.log("***util else " + app.globalData.isOk)
    return true
  }

}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatTime3: formatTime3,
  isNull: isNull
}
