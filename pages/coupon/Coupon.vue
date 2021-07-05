<template>
	<main class = "coupon">
		<u-navbar title="我的优惠券"></u-navbar>
		<coupon-item></coupon-item>
	</main>
</template>

<script>
	import CouponItem from './common/CouponItem.vue'
	export default{
		components:{
			CouponItem
		}
	}
</script>

<style>
</style>
