import axios from 'axios'
import qs from 'qs'

import Vue from 'vue'
let vm = new Vue()
axios.defaults.timeout = 5000

axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data.reqId = +new Date()
    // 文件上传接口不需要格式化data
    if (config.url.indexOf('uploadResImage') === -1) {
      config.data = qs.stringify(config.data)
    }
  } else {
    config.params = config.params || {}
    config.params.reqId = +new Date()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  if (res.config.method === 'post') {
    if (String(res.data.code) === '0000') {
      // vm.$notify({
      //   title: '操作成功',
      //   message: '操作成功',
      //   type: 'success'
      // })
    } else {
      /*
      * 登录信息用京东商城的登录信息账号密码
      */
      if (res.data.error === 'NotLogin') {
        let uriStr = window.location.href
        console.log('uriStr', uriStr)
        uriStr = encodeURI(uriStr)
        let ssaUrl = ''
        if (res.data.environment === 'online') {

          ssaUrl = 'https://passport.jd.com/uc/login?ReturnUrl='
        } else {

          ssaUrl = 'https://passport.jd.com/uc/login?ReturnUrl='
        }
        window.location.href = ssaUrl + uriStr
      }
      // vm.$notify.error({
      //   title: '操作失败',
      //   message: res.data.msg || '操作失败',
      //   type: 'error'
      // })
    }
  }

  return res
}, function (error) {
  vm.$notify.error({
    title: '网络状态',
    message: '请检查网络状态',
    type: 'error'
  })
  // Do something with response error
  return Promise.reject(error)
})

// 让ajax请求头携带cookie
axios.defaults.withCredentials = true

// if (isUploadFile) { // 文件上传类型
//   console.log('文件类型。。。')
//   axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// } else {
//   console.log('文本类型。。。')
//   isUploadFile = false
// }

export default axios
