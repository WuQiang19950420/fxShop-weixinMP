import {request} from './request.js'

export function getShops(data){
	return request({
		url:'/distri/xcxgoods',
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}