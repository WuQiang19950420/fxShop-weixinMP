<template>
	<article class = "me-more-shops">
		<div></div>
		<section class = "shop-warp">
			<shop-item @click.native = "goShopDetail"></shop-item>
			<shop-item>
				<p>aaa啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊aaaaaaa</p>
			</shop-item>
			<shop-item></shop-item>
		</section>
		<section class = "shop-warp">
			<shop-item></shop-item>
			<shop-item></shop-item>
			<shop-item></shop-item>
		</section>
	</article>
</template>

<script>
	import ShopItem from '../../common/ShopItem.vue'
	export default{
		components:{
			ShopItem
		},
		methods:{
			goShopDetail(){
				uni.navigateTo({
					url:"ShopDetail"
				})
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.me-more-shops{
		display: flex;
		width: 95%;
		margin: 0 auto;
		.shop-warp{
			display: flex;
			flex-direction: column;
			width: 50%;
		}
	}
</style>