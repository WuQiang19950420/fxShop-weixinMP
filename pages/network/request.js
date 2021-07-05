import axios from 'uni-axios'
import {getAgainMpWxToken} from '../common/Common.js'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://yhltest001.vaiwan.com",
    timeout: 5000,
	headers: {
		"token": wx.getStorageSync("token")
	}
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
	return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
 instance.interceptors.response.use(res => {
	if(res.data.code === -2){
		uni.setStorageSync('isMpWxLogin','0')
		setTimeout(() => {
			uni.switchTab({
				url:"/pages/shop/ShopDetail"
			})
		},800)
	}
	return res
  }, err => {
    console.log(err);
  })
  // 3.发送网络请求
  return instance(config)
}
