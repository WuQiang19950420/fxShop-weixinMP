<template>
	<view class="wrap">
		<u-swiper :list="goodsDetailImg" :height = "800"></u-swiper>
	</view>
</template>

<script>
	export default {
		props:{
			goodsDetailImg:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: 800rpx;
	}
</style>