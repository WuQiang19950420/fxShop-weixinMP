import {getLogin} from '../network/Login.js'
//正则 只能一位小数点和只能是数字
export function NumberOneDig(data){
	return data.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
}
//微信小程序登陆获取token
export function getMpWxToken(loginErro,loginSuccess){
	wx.getUserProfile({
		desc:'授权登录',
		success(res){
			console.log(res)
			let data = {
				nickName:res.userInfo.nickName,
				headUrl:res.userInfo.avatarUrl
			}
			wx.login({
				success(res){
					data.code = res.code
					data.tranType = 1
					getLogin(data).then(res => {
							if(res.data.code === 1){
								wx.setStorageSync('token',res.data.token)
								loginSuccess()
							}else{
								loginErro()
						}
					})
				}
			})
		}
	})	
}