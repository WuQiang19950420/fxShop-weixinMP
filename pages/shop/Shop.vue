<template>
	<main class="shop">
		<section class="shop-warp">
			<shop-item @click.native="goShopDetail"></shop-item>
			<shop-item>
				<p>aaa啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊aaaaaaa</p>
			</shop-item>
			<shop-item></shop-item>
		</section>
		<section class="shop-warp">
			<shop-item></shop-item>
			<shop-item></shop-item>
			<shop-item></shop-item>
		</section>
	</main>
</template>

<script>
	import ShopItem from '../common/ShopItem.vue'
	export default {
		components: {
			ShopItem
		},
		data() {
			return {}
		},
		methods: {
			goShopDetail() {
				uni.navigateTo({
					url: "ShopDetail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop {
		display: flex;
		width: 100%;
		margin: 0 auto;

		.shop-warp {
			display: flex;
			flex-direction: column;
			width: 50%;
		}
	}
</style>
