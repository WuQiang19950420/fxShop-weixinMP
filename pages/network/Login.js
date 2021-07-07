import {request} from './request.js'

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