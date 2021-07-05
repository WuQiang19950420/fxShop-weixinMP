import {request} from './request.js'

//获取用户地址
export function getAddress(){
	return request({
		url:"/distri/address"
	})
}

//保存用户地址
export function setAddress(data){
	return request({
		url:"/distri/saveAddress",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}
//删除用户地址
export function deleteAddress(data){
	return request({
		url:"/distri/delAddress",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}
//修改用户地址
export function reviseAddress(data){
	return request({
		url:"/distri/updAddress",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}