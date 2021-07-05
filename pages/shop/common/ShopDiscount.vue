<template>
	<article class = "shop-discount">
		<shop-nav-common>
			<h3 slot = "shop-nav-left">优惠</h3>
			<span slot = "voucher">优惠券</span>
			<span slot = "shop-nav-content">大额优惠券等你来拿</span>
			<span slot = "voucherOne">促销优惠</span>
			<span slot = "shop-nav-content-one">满十一免运费</span>
		</shop-nav-common>

	</article>
</template>

<script>
	import ShopNavCommon from './ShopNavCommon.vue'
	export default{
		components:{
			ShopNavCommon
		}
	}
</script>

<style lang = "scss" scoped>
	.shop-discount{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding:20rpx 20rpx 0 20rpx
	}
</style>
