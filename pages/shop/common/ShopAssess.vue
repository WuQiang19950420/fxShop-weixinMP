<template>
	<article class = "shop-assess">
		<header>
			<span>商品评价<em>(200000)</em></span>
			<span>查看更多</span>
		</header>
		<shop-assess-common></shop-assess-common>
		<shop-assess-common></shop-assess-common>
	</article>
</template>

<script>
	import ShopAssessCommon from './ShopAssessCommon.vue'
	export default {
		components:{
			ShopAssessCommon
		}
	}
</script>

<style lang = "scss" scoped>
	.shop-assess{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		header{
			display: flex;
			justify-content: space-between;
			padding-right: 38rpx;
			span:nth-of-type(1){
				color: #262626;
				font-weight: 700;
				font-size: 30rpx;
				em{
					font-style: normal;
					font-size: 26rpx;
					margin-left: 10rpx;
				}
			}
			span:nth-of-type(2){
				font-size: 23rpx;
				color: #fb1438;
				position: relative;
				&:after{
					content: '';
					background-image: url(../../../static/image/common/enter-red.png);
					background-repeat: no-repeat;
					background-size:28rpx 24rpx;
					display: inline-block;
					width: 28rpx;
					height: 24rpx;
					position: absolute;
					top:4rpx;
					right:-38rpx;
				}
			}
		}
		
	}
</style>