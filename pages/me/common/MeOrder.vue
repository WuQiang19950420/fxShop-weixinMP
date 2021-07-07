<template>
	<article class = "me-order">
		<div class = "me-order-icon">
			<div @click = "goWaitPay">
				<img src = "/static/image/me/wait-pay.png">
				<span>待付款</span>
			</div>
			<div @click = "goWaitTakeOver">
				<img src = "/static/image/me/wait-take-goods.png">
				<span>待收货</span>
			</div>
			<div @click = "goWaitOrderAssess">
				<img src = "/static/image/me/wait-discuss.png">
				<span>已完成</span>
			</div>
			<div @click = "goWaitAfterMarket">
				<img src = "/static/image/me/change-good.png">
				<span>退换/售后</span>
			</div>
			<div @click = "goAllOrder">
				<img src = "/static/image/me/order.png">
				<span>全部订单</span>
			</div>
		</div>
	</article>
</template>

<script>
	export default{
		methods:{
			goWaitPay(){
				uni.setStorageSync('indexs', 1);
				uni.switchTab({
					url:'/pages/order/Order',
					success: (res) => {
						let page = getCurrentPages().pop();
						if (page == undefined || page == null) return;
						page.onLoad(); 
					}
				})
			},
			goWaitTakeOver(){
				uni.setStorageSync('indexs', 3);
				uni.switchTab({
					url:'/pages/order/Order'
				})
			},
			goWaitOrderAssess(){
				uni.setStorageSync('indexs', 4);
				uni.switchTab({
					url:'/pages/order/Order'
				})
			},
			goWaitAfterMarket(){
				if(wx.getStorageSync('token')){
					uni.navigateTo({
						url:'/pages/service/Service'
					})
				}else{
					uni.navigateTo({
						url:'../login/MpWxLogin'
					})
				}	
			},
			goAllOrder(){
				uni.setStorageSync('indexs', 0);
				uni.switchTab({
					url:'/pages/order/Order'
				})
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.me-order{
		width: 95%;
		margin: 0 auto;
		margin-top: -80rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		display: flex;
		padding: 36rpx 20rpx;
		.me-order-icon{
			display:flex;
			flex:1;
			position: relative;
			img{
				width: 60rpx;
				height: 60rpx;
			}
			div{
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 1;
				font-size: 26rpx;
				span{
					margin-top: 10rpx;
				}
				&:last-child::before{
					content:'';
					background-image:url(../../../static/image/me/line.png);
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 120rpx;
					width: 20rpx;
					height: 144rpx;
					background-size: 10px;
					background-repeat: no-repeat;
				}
			}
		}
	}
</style>
