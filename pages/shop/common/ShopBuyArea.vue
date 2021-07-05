<template>
	<article class = "shop-buy-area">
		<div class = "shop-buy-area-top">
			<div class = "new-price">
				<text>￥</text><text class = "new-price-number" v-if= "goodsDetail">{{goodsDetail[0].selingprice}}</text>	
			</div>
			<div class = "old-price">
				<span v-if= "goodsDetail">￥{{goodsDetail[0].originalPrice}}</span>			
			</div>
		</div>
		<h3>{{goods.name}}</h3>
		<p>{{goods.resv1}}</p>
	</article>
</template>

<script>
	export default{
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			},
			goodsDetail:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.shop-buy-area{
		width: 100%;
		background-color: #FFFFFF;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius:20rpx;
		padding: 20rpx 30rpx;
		.shop-buy-area-top{
			display:flex;
			.new-price{
				color:$price-red;
				.new-price-number{
					font-size: 60rpx;
				}
			}
			.old-price{
				color:#909399;
				text-decoration: line-through;
				margin-left: 20rpx;
				font-size: 32rpx;
				margin-top: 26rpx
			}
		}
		h3{
			margin-top: 18rpx;
		}
		p{
			font-size: 24rpx;
			color:$uni-text-color-grey;
			margin-top:30rpx
		}
	}
</style>
