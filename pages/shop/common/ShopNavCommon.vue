<template>
	<section class = "shop-nav-common">
		<div class = "shop-nav-left">
			<slot name = "shop-nav-left"></slot>
		</div>
		<div class = "shop-nav-right">
			<slot name = "shop-nav-content"></slot>
			<slot name = "text"></slot>
		</div>
		<img src = "/static/image/common/enter.png">
	</section>
</template>

<script>
</script>

<style lang = "scss" scoped>
	.shop-nav-common{
		display: flex;
		position: relative;
		margin-top: 20rpx;
		.shop-nav-left{
			margin-right: 20rpx;
			height:100%;
			.shop-nav-common-left{
				position: relative;
				top:-18rpx;
				font-weight:700;
				font-size: 26rpx;
			}
		}
		img{
			width: 48rpx;
			height: 42rpx;
			position: absolute;
			right:0;
			top:0;
		}
	}
</style>