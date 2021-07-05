<template>
	<article class = "pay-fixed">
		<slot name = "circle"></slot>
		<slot></slot>
	</article>
</template>

<script>
	export default{
	}
</script>

<style lang = "scss" scoped>
	.pay-fixed{
		display: flex;
		justify-content:flex-end;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		background-color: #FFFFFF;
	}
</style>
