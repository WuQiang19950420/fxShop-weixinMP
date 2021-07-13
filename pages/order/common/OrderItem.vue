<template>
	<section class = "order-item">
		<header>
			<h4>剀拉科技</h4>
			<div class = "order-item-header-right">
				<span :style = "{color:payStateColor}">{{payState}}</span>
				<div></div>
			</div>
		</header>
		<article>
			<div class = "order-item-content">
				<img :src = "product.image">
				<p>
					<span class = "product-name">{{product.name}}</span>
					<span class = "product-detail-name">型号:{{product.detailName}}</span>
				</p>
				<small>x{{product.count}}</small>
			</div>
			<div class = "order-item-price">
				<span>实付</span>
				<span>￥{{(product.count * product.selingprice).toFixed(2)}}</span>
			</div>
		</article>
		<footer>
			<button hover-class="none" v-if = "leftBtn" @click.stop = "leftBtnClick()">{{leftBtn}}</button>
			<button hover-class="none" v-if = "rightBtn"@click.stop = "rightBtnClick()">{{rightBtn}}</button>
		</footer>
		<u-toast ref="uToast" />
	</section>
</template>

<script>
	import {cancelOrder,againPay,applyRefund,confirmReceipt} from '../../network/Order.js'
	export default{
		props:{
			product:{
				type:Object,
				default(){
					return {}
				}
			},
			tabIndex:{
				type:Number,
				default:null
			},
			index:{
				type:Number,
				default:null
			}
		},
		data(){
			return{
				payStateColor:null ,//订单状态颜色
				leftBtn:null,
				rightBtn:null,
				show:false,
				isNeed:null
			}
		},
		computed:{
			payState(){
				let isDeliver = this.product.isDeliver
				let payStatus = this.product.payStatus
				let refundStatus = this.product.refundStatus
				if(isDeliver == 2 && !refundStatus){
					this.payStateColor = '#303133'
					this.rightBtn = '退款/退货'
					return '已完成'
				}else if(isDeliver == 1 && payStatus == 2 && !refundStatus){
					this.payStateColor = '#303133'
					this.leftBtn = ''
					this.rightBtn = '确认收货'
					return '等待收货'
				}else if(payStatus == 1 && isDeliver == 0 && !refundStatus){
					this.payStateColor = '#f23030'
					this.leftBtn = '取消订单'
					this.rightBtn = '去支付'
					return '等待付款'
				}else if(payStatus == 3 && isDeliver == 0 && !refundStatus){
					this.payStateColor = '#303133'
					this.leftBtn = ''
					this.rightBtn = ''
					return '支付失败'
				}else if(payStatus == 4){
					this.payStateColor = '#b4b4b4'
					this.leftBtn = ''
					this.rightBtn = ''
					return '已取消'
				}else if(isDeliver == 0 && payStatus == 2 && !refundStatus){
					this.payStateColor = '#303133'
					this.leftBtn = ''
					this.rightBtn = '申请退款'
					return '等待发货'
				}else if(refundStatus == 2){
					this.payStateColor = '#303133'
					this.leftBtn = ''
					this.rightBtn = ''
					return '退款成功'
				}else if(refundStatus == 3){
					this.payStateColor = '#303133'
					this.leftBtn = ''
					this.rightBtn = '申请退款'
					return '退款失败'
				}
			}
		},
		methods:{
			leftBtnClick(){
				if(this.payState == "等待收货"){
					console.log('查看物流')
				}else if(this.payState == "等待付款"){
					console.log('取消订单')
					this.cancelOrder()
				}
			},
			rightBtnClick(){
				if(this.payState == "已完成" || this.payState == "等待发货" || this.payState == "退款失败"){
					this.applyRefund()
				}else if(this.payState == "等待收货"){
					this.confirmReceipt()
				}else if(this.payState == "等待付款"){
					this.againPay()
				}
			},
			confirmReceipt(){
				let data = {
					oid:this.product.id
				}
				confirmReceipt(data).then(res => {
					if(res.data.code === 1){
						this.$emit('changeTabsIndex')
						this.$refs.uToast.show({title:res.data.msg})
					}else if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在跳转'})
					}else{
						this.$refs.uToast.show({title:res.data.msg})
					}
				})
			},
			cancelOrder(){
				let data = {
					oid:this.product.id
				}
				cancelOrder(data).then(res => {
					if(res.data.code === 1){
						if(this.tabIndex === 0){
							this.leftBtn = ''
							this.rightBtn = ''
							this.product.payStatus = '4'
						}else{
							this.$emit('deleteItem',this.index)
						}
						console.log(1)
						this.$refs.uToast.show({title: '取消成功'})
					}else if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在跳转'})
					}else{
						this.$refs.uToast.show({title: '取消失败'})
					}
				})
			},
			applyRefund(){
				let isDeliver = this.product.isDeliver
				let payStatus = this.product.payStatus
				let refundStatus = this.product.refundStatus
				if(isDeliver == 2 && !refundStatus){
					this.isNeed = 1
				}else if(isDeliver == 0 && payStatus == 2 && !refundStatus){
					this.isNeed = 0
				}
				let data = {
					oid:this.product.id,
					orderId:this.product.orderId,
					isNeed:this.isNeed
				}
				applyRefund(data).then(res => {
					if(res.data.code === 1){
						this.$refs.uToast.show({title: '退款申请成功,等待管理员审核'})
						setTimeout(()=> {
							uni.navigateTo({
								url:'../../service/Service'
							})
						},300)
					}else if(res.data.code === -1){
						this.$refs.uToast.show({title:res.data.msg})
					}else if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在跳转'})
					}
				})
			},
			againPay(){
				let data = {
					oid:this.product.id
				}
				againPay(data).then(res => {
					if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在跳转'})
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
	.order-item{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		header{
			display: flex;
			justify-content: space-between;
			h4{
				font-size: 32rpx;
				&:after{
					content:'';
					background-image: url(../../../static/image/common/enter.png);
					display: inline-block;
					background-repeat: no-repeat;
					width: 36rpx;
					height: 36rpx;
					position: relative;
					top:8rpx;
					background-size: cover;
				}
			}
			.order-item-header-right{
				display: flex;
				align-items: center;
/* 				div{
					&:before{
						content:'';
						display: inline-block;
						width: 1px;
						height: 22rpx;
						background-color: #979A9A;
						margin: 0 20rpx;
					}
					&:after{
						content:'';
						background-image: url(../../../static/image/order/delete-order.png);
						display: inline-block;
						background-repeat: no-repeat;
						width: 30rpx;
						height: 30rpx;
						position: relative;
						top:4rpx;
						background-size: cover;
					}
				} */
			}
		}
		article{
			margin-top: 40rpx;
			.order-item-content{
				display: flex;
				justify-content: space-between;
				align-items:center;
				img{
					width: 150rpx;
					height: 150rpx;
					border-radius: 12rpx;
				}
				p{
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					flex: 1;
					.product-name{
						overflow: hidden;
						 text-overflow: ellipsis;
						 display: -webkit-box;
						 -webkit-line-clamp: 2;
						 -webkit-box-orient: vertical;
					}
					.product-detail-name{
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #a6acb3;
					}
				}
				small{
					width: 100rpx;
					text-align: center;
					font-size: 14px;
					color: $uni-text-color-grey;
				}
			}
			.order-item-price{
				display: flex;
				justify-content: flex-end;
				height: 80rpx;
				line-height: 80rpx;
				span:nth-child(2){
					font-size: 16px;
					color: #151515;
				}
			}
		}
		footer{
			display: flex;
			justify-content: flex-end;
			margin-top: 30rpx;
			button{
				width: 176rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				border-radius: 40rpx;
				border:1px solid #494e52;
				margin-left: 40rpx;
				&:active{
					background-color: rgba(0,0,0,0.1);
				}
			}
		}
	}
	.pay-state-active{
		color: $write-red;
	}
</style>
