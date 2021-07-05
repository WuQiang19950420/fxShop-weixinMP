<template>
	<section class = "shop-item">
		<img :src = "shop.image">
		<article>
			<h4>{{shop.title}}</h4>
			<slot></slot>
			<span>{{shop.price}}</span>
			<p>{{shop.name}}</p>
		</article>
	</section>
</template>

<script>
	export default{
		data(){
			return{
				shop:{
						price: 35,
						title: '居易居易居易居易居易居易居易',
						name: '李白杜甫白居易旗舰店',
						image: 'static/image/abc.jpg',
					}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.shop-item{
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin: 8rpx;
		img{
			width: 100%;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
		}
		article{
			padding:20rpx;
			h4{
				font-size: 26rpx;
				font-weight: 400;
				margin-bottom: 6rpx;
			}
			span{
				color: $write-red;
				font-size: 30rpx;
			}
			p{
				font-size: 22rpx;
				color: #909399;
				margin-top: 10rpx;
			}
		}
	}
</style>
