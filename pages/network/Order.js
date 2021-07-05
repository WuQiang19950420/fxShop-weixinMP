import {request} from './request.js'

//用户下单
export function placeOrder(data){
	return request({
		url:"/distri/order",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}

//获取订单
export function getOrder(data){
	return request({
		url:"/distri/queryOrder",
		params:{
			type:data.type,
			refundStatus:data.refundStatus,
			currentPage:data.currentPage,
			pageSize:data.pageSize
		}
	})
}

//取消订单
export function cancelOrder(data){
	return request({
		url:"/distri/removeOrder",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}

//用户待付款里支付
export function againPay(data){
	return request({
		url:"/distri/payAgain",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}

//用户申请退款
export function applyRefund(data){
	return request({
		url:"/distri/applyRefund",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}
//用户确认收货
export function confirmReceipt(data){
	return request({
		url:"/distri/harvestOrder",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}
//填写物流单号
export function setRefundCode(data){
	return request({
		url:"/distri/refundCode ",
		method:"post",
		headers:{
		   'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}