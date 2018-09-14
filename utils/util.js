const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
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

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatTime3: formatTime3
}
