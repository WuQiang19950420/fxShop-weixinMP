import {request} from './request.js'

export function getShops(data){
	return request({
		url:'/distri/wgoods',
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}

export function getLogin(data){
	return request({
		url:'/distri/loginWithXcx',
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}