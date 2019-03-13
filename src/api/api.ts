
import axios, { AxiosResponse } from 'axios'

import qs from 'qs'

const service = axios.create({
  baseURL: 'http://index.gc169.com',
  withCredentials: false,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

service.interceptors.response.use(
  response => {
    return response
  },
  (error: any) => {
    console.log(
      'fetch',
      error.config.url,
      error.config.params,
      'error. error:',
      error
    )
    return Promise.reject(error)
  }
)

const api = {
  getCategory (data) {
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/getCategory',data)
  },
  getPubDatas (data) {
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/getPubDatas',data)
  },
  getArea (data) {
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/getArea',data)
  },
  getAllTendency (data?) {
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/getAllTendency',data)
  },
  getIndexDatas (data) {
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/getIndexDatas',data)
  },
  getPubDatasBylogin (data) {// 我的，获取登录后的详细数据
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/getPubDatas',data)
  },
  getTendencyByCity (data) {
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/getTendencyByCity',data)
  },
  userLogin (data) {
    if (data) {
      data = qs.stringify(data, { allowDots: true })
    }
    return service.post('/idxapi/userLogin',data)
  }
}

export default api
