<template>
	<article class = "me-order">
		<div class = "me-order-icon">
			<div @click = "goAddressManage">
				<img src = "~static/image/me/icon-change-address.png">
				<span>地址管理</span>
			</div>
			<div @click = "godetail">
				<img src = "~static/image/me/icon-detail.png">
				<span>账目明细</span>
			</div>
<!-- 			<div>
				<img src = "~static/image/me/icon-bind-phone.png">
				<span>绑定手机</span>
			</div>
			<div>
				<img src = "~static/image/me/icon-change-password.png">
				<span>更改密码</span>
			</div>
			<div>
				<img src = "~static/image/me/icon-change-user.png">
				<span>修改信息</span>
			</div>
			<div>
				<img src = "~static/image/me/icon-message.png">
				<span>我的评论</span>
			</div>
			<div>
				<img src = "~static/image/me/icon-shop.png">
				<span>积分商城</span>
			</div>
			<div>
				<img src = "~static/image/me/icon-change-mail.png">
				<span>绑定邮箱</span>
			</div> -->
		</div>
	</article>
</template>

<script>
	export default{
		methods:{
			goAddressManage(){
				if(wx.getStorageSync('token')){
					this.$store.commit('getAddressBack',1)
					uni.navigateTo({
						url:'/pages/address/AddressManage'
					})
				}else{
					uni.navigateTo({
						url:'../login/MpWxLogin'
					})
				}
			},
			godetail(){
				if(wx.getStorageSync('token')){
					uni.navigateTo({
						url:'/pages/accountDetail/AccountDetail'
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
		padding: 36rpx 0 16rpx 0;
		.me-order-icon{
			display:flex;
			flex-wrap: wrap;
			position: relative;
			img{
				width: 70rpx;
				height: 70rpx;
			}
			div{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: (100% / 4);
				font-size: 26rpx;
				margin-bottom:20rpx;
				span{
					margin-top: 10rpx;
				}
			}
		}
	}
</style>