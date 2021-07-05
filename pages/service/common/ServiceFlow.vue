<template>
	<article class = "service-flow">
		<h5>提交申请</h5>
		<p>什么东西啊啊啊水水水水水水水水水水水水水水水水水</p>
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
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.service-flow{
		width: 95%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 50rpx 20rpx;
		margin: 0 auto;
		position: relative;
		top: -40rpx;
		h5{
			font-size: 30rpx;
			margin-bottom: 10rpx;
		}
		p{
			width: 85%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #aaaaaa;
		}
		&:after{
			content: '';
			display: block;
			width: 50rpx;
			height: 50rpx;
			background: url('/static/image/common/enter.png');
			background-size: contain;
			position: absolute;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
