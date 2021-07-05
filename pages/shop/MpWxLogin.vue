<template>
	  <view class='headView'>
		<view class= "margin-middle">
		    <view class='headImageView'>
			      <img class='headImage' src = "/static/image/login/logo.jpg"></img>
				  <view>智心科技</view>
			</view>
		    <view class='titleText'>申请获取以下权限</view>
		    <view class='contentText'>获得你的公开信息(昵称,头像,手机等)</view>
		    <button class='authBtn' type='primary' open-type='getUserInfo' @click="loginClick">授权登录</button>
		</view>
		<u-toast ref="uToast" />
	  </view>
</template>

<script>
	import {getMpWxToken} from '../common/Common.js'
	export default{
		methods:{
			loginClick(){
				getMpWxToken(this.loginErro,this.loginSuccess)
			},
			loginErro(){
				this.$refs.uToast.show({title: '登录失败'})
			},
			loginSuccess(){
				this.$emit('getShopDetail')
			}
		}
	}
</script>

<style scoped lang="scss">
	.headView {
		height: 100vh;
		position: relative;
		font-size:30rpx;
		.margin-middle{
			position: absolute;
			width: 100%;
			top:40%;
			transform: translateY(-50%);
			.headImageView {
				display: flex;
				align-items: center;
				margin-left: 50rpx;
				margin-top: 50rpx;
				margin-right: 50rpx;
				height: 100rpx;
				.headImage {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 30rpx;
				}
			}
			.titleText {
				margin-top: 30rpx;
				margin-bottom: 20rpx;
				color: #020e0f;
				text-align: center;
			}
			.contentText {
				color: #666;
				text-align: center;
			}
			.authBtn {
				width: 85%;
				height: 90rpx;
				font-size: 34rpx;
				margin: 0 auto;
				margin-top:80rpx;
			}
		}
	}
</style>
