import {request} from './request.js'
//获取用户信息
export function getUser(data){
	return request({
		url:"/distri/cuer"
	})
}

//提现
export function getCash(data){
	return request({
		url:"/distri/cash",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}