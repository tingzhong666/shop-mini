// 时间处理 倒计时
export const time = function (sec) {
  const s = (sec % 60 + '').padStart(2, '0')
  const m = ((sec - s) / 60 % 60 + '').padStart(2, '0')
  const h = ((sec - (s * 1 + m * 60)) / 60 / 60 + '').padStart(2, '0')
  return { h, m, s, origin: sec }
}

// 时间戳转日期
export const date = function (time) {
  time = new Date(time)
  const Y = (time.getFullYear() + '')
  const M = (time.getMonth() + 1 + '').padStart(2, '0')
  const D = (time.getDate() + '').padStart(2, '0')
  const h = (time.getHours() + '').padStart(2, '0')
  const m = (time.getMinutes() + '').padStart(2, '0')
  return `${Y}-${M}-${D} ${h}:${m}`
}

// Storage获取
export const getStorage = function (key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// Storage删除
export const rmStorage = function (key) {
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// Storage设置
export const setStorage = function ({ key, data }) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: () => {
        resolve()
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
