<template>
	<article class = "me-order">
		<div class = "me-order-icon">
			<div>
				<span>￥{{userData.amt || 0}}</span>
				<span>余额</span>
			</div>
			<div>
				<span>￥{{userData.frozenAmt || 0}}</span>
				<span>冻结金额</span>
			</div>
			<div>
				<span>￥{{userData.settlementAmt || 0}}</span>
				<span>待结算</span>
			</div>
			<div @click = "goCaptial">
				<img src = "/static/image/me/capital.png">
				<span>我的资产</span>
			</div>
		</div>
	</article>
</template>

<script>
	export default{
		props:{
			userData:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			goCaptial(){
				if(wx.getStorageSync('token')){
					let userData = JSON.stringify(this.userData)
					uni.navigateTo({
						url:`/pages/me/Captial?userData=${userData}`
					})
				}else{
					uni.navigateTo({
						url:'../login/MpWxLogin'
					})
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.me-order{
		width: 95%;
		margin: 0 auto;
		margin-top: 20rpx;
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
				position: relative;
				top:8rpx;
			}
			div{
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 1;
				font-size: 26rpx;
				span:nth-child(1){
					font-size: 32rpx;
					font-weight: 700;
					margin-top: 14rpx;
					padding-right: 10rpx;
				}
				span:nth-child(2){
					margin-top: 20rpx;
				}
			}
		}
	}
</style>

