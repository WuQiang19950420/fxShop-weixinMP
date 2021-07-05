<template>
	<article class = "order-detail-state">
		<h5>{{payState}}</h5>
		<p v-if = "payState == '等待付款'">请在下单后2小时内支付</p>
		<button v-if = "payState == '等待付款'" @click="pay">去支付</button>
		<button v-if = "payState == '等待收货'" @click="confirmReceipt">确认收货</button>
		<u-toast ref="uToast" />
	</article>
</template>

<script>
	import {cancelOrder,againPay,applyRefund,confirmReceipt} from '../../network/Order.js'
	export default{
		props:{
			goodsDetail: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed:{
			payState(){
				console.log(this.goodsDetail)
				let isDeliver = this.goodsDetail.isDeliver
				let payStatus = this.goodsDetail.payStatus
				let refundStatus = this.goodsDetail.refundStatus
				console.log(!this.goodsDetail.refundStatus)
				if(isDeliver == 2 && !refundStatus){
					return '已完成'
				}else if(isDeliver == 1 && payStatus == 2 && !refundStatus){
					return '等待收货'
				}else if(payStatus == 1 && isDeliver == 0 && !refundStatus){
					return '等待付款'
				}else if(payStatus == 3 && isDeliver == 0 && !refundStatus){
					return '支付失败'
				}else if(payStatus == 4){
					return '已取消'
				}else if(isDeliver == 0 && payStatus == 2 && !refundStatus){
					return '等待发货'
				}else if(refundStatus == 2){
					return '退款成功'
				}else if(refundStatus == 3){
					return '退款失败'
				}
			}
		},
		methods:{
			pay(){
				this.againPay()
			},
			// 确认收货
			confirmReceipt(){
				this.confirmReceipt()
			},
			confirmReceipt(){
				let data = {
					oid:this.goodsDetail.id
				}
				confirmReceipt(data).then(res => {
					if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在重新登陆至首页'})
					}else{
						console.log(res)
					}
				})
			},
			againPay(){
				let data = {
					oid:this.goodsDetail.id
				}
				againPay(data).then(res => {
					if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在重新登陆至首页'})
					}else if(res.data.code === 1){
						wx.requestPayment({
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr, 
							package: res.data.package,
							signType: res.data.signType, 
							paySign: res.data.paySign, 
						})
					}else{
						this.$refs.uToast.show({title:res.data.msg})
					}
				})
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.order-detail-state{
		position: relative;
		height: 300rpx;
		background-image: linear-gradient(140deg,#ff7575,#ff4415);
		color: #fff;
		padding: 64px 10px 30px;
		font-size: 12px;
		text-align: center;
		overflow: hidden;
		h5{
			font-size: 38rpx;
			position: absolute;
			top:60rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		&:before{
			content: "";
			position: absolute;
			width: 60%;
			height: 0;
			padding-bottom: 28%;
			left: 0;
			top: 0;
			border-radius: 0 0 70% 0/0 0 100% 0;
			opacity: .63;
			background-image: linear-gradient(230deg,rgba(244,29,40,0) 50%,#ff4415 96%);
			box-shadow: 0 2px 40px 0 #f21a2a;
		}
		button{
			width: 240rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #f2270c;
			background-color: #FFF;
			border-radius: 42rpx;
			position: absolute;
			top:180rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
