<template>
	<article class = "shop-fast-mail-specs">
		<shop-nav-common @click.native = "buy">
			<view slot = "shop-nav-left" class = "shop-nav-common-left">已选</view>
			<text slot = "shop-nav-content" class = "shop-nav-common-right">1个</text>
<!-- 			<p slot = "text">本商品支持京东保障服务，点击可选服务</p> -->
		</shop-nav-common>
		<shop-nav-common>
			<view slot = "shop-nav-left" class = "shop-nav-common-left">送至</view>
			<text slot = "shop-nav-content" class = "shop-nav-common-right">{{NewAddress}}</text>
			<view slot = "text" class = "shop-nav-small-text">由商家从上海发货</view>
		</shop-nav-common>
	</article>
</template>

<script>
	import ShopNavCommon from './ShopNavCommon.vue'
	export default{
		components:{
			ShopNavCommon
		},
		props:{
			address:{
				type:String,
				default:''
			}
		},
		computed:{
			NewAddress(){
				return this.address.replace(/,/g,' ')
			}
		},
		methods:{
			buy(){
				this.$emit('buy')
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.shop-fast-mail-specs{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding:0 20rpx 20rpx 20rpx;
		border: 1px solid transparent;
		.shop-nav-small-text{
			color:$uni-text-color-grey;
			font-size: 26rpx;
		}
		.shop-nav-common-right{
			font-size: 28rpx;
		}
	}
</style>
