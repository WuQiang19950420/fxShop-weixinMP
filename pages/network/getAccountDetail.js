import {request} from './request.js'

//获取收益明细
export function getAccountDetail(data){
	return request({
		url:"/distri/shareDetail",
		params:{
			currentPage:data.currentPage,
			pageSize:data.pageSize,
			startDate:data.startDate,
			endDate:data.endDate
		}
	})
}