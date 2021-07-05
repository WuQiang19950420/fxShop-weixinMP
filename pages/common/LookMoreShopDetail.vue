<template>
	<article class = "look-more-shop-detail">
		<div class = "left-line"></div>
		<slot></slot>
		<div class = "right-line"></div>
	</article>
</template>

<script>
</script>

<style lang = "scss" scoped>
	.look-more-shop-detail{
		display:flex;
		align-items:center;
		justify-content:center;
		margin:20rpx 0;
		.left-line,.right-line{
			width: 180rpx;
			height: 1rpx;
			background-color:#d4d4d4;
		}
	}
</style>
