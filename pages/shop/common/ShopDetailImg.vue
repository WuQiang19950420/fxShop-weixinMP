<template>
	<article class = "shop-detail-img">
		<image v-for = "(item,index) in newShopDetail" :src = "item">
	</article>
</template>

<script>
	export default{
		props:{
			goodsDetailImg:{
				type:String,
				default:''
			}
		},
		computed:{
			newShopDetail(){
				return this.goodsDetailImg.split('|')
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.shop-detail-img{
		width: 100%;
		margin-top: 20rpx;
		height: fit-content;
		image{
			width: 100%;
			height: 1000rpx
		}
	}
</style>
