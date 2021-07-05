<template>
	<article class = "order-detail-state">
		<h5>{{payStates}}</h5>
		<u-steps :list="numList" :current= "current" mode="number" active-color="#FFA488" un-active-color = "#fff"></u-steps>
	</article>
</template>

<script>
	export default{
		props:{
			serviceDetail: {
				type: Object,
				default () {
					return {}
				}
			},
			payState:{
				type:String,
				default:''
			}
		},
		computed:{
			payStates(){
				switch(parseInt(this.payState)){
					case 0:
						return '待退款'
					case 1:
						return '退款中'
					case 2:
						return '退款成功'
					case 3:
						return '退款失败'
					case 4:
						return '退款关闭'
				}
			},
			current(){
				if(this.serviceDetail.refundStatus == 0){
					return 1
				}else if(!this.serviceDetail.refundStatus){
					return 2
				}else if(this.serviceDetail.refundStatus == 1){
					return 3
				}else if(this.serviceDetail.refundStatus == 2 || this.serviceDetail.refundStatus == 3 || this.serviceDetail.refundStatus == 4)
					return 4
			},
			numList(){
				return [{
					name: '提交申请'
				}, {
					name: '平台初审'
				}, {
					name: '输入回执单号'
				},{
					name: '平台审核'
				},{
					name: '完成'
				}]
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.order-detail-state{
		position: relative;
		height: 300rpx;
		background-image:linear-gradient(14deg, #FF614D 0%, #FE7552 100%);
		color: #fff;
		padding: 64px 10px 30px;
		font-size: 12px;
		text-align: center;
		overflow: hidden;
		h5{
			font-size: 38rpx;
			position: absolute;
			top:40rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
