// 响应后全局处理
const resAfter = function (res) {
  if (res.statusCode === 200) {
    return res.data
  }
  console.log('响应出错：', res)
}

// 此对象所有方法的 path 参数，前面必须带 '/' 斜线
const http = {
  // 接口
  host: 'http://129.28.186.105:5757/weapp',
  // host: 'http://localhost:5757/weapp',

  // get 封装
  get (path, query = {}) {
    return new Promise((resolve, reject) => {
      let raw = ''
      Object.keys(query).forEach(item => {
        raw += `${item}=${query[item]}&`
      })
      const url = this.host + path + '?' + raw
      wx.request({
        method: 'GET',
        url,
        success: res => {
          res = resAfter(res)
          resolve(res)
        },
        error: err => {
          reject(err)
        }
      })
    })
  },

  // post 封装
  post (path, data = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: this.host + path,
        data,
        success: res => {
          res = resAfter(res)
          resolve(res)
        },
        error: err => {
          reject(err)
        }
      })
    })
  }
}

export default http
