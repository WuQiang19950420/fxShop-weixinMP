<template>
	<section class = "shop-assess-common">
		<header>
			<div class = "shop-assess-common-header-left">
				<img class = "user-img" src = "/static/image/shop/user-default.png">
				<div>
					<span>jame123123</span>
					<ul>
						<li v-for = "item in star"><img :src = "item"></li>
					</ul>
				</div>
			</div>
			<time>2020-10-10</time>
		</header>
		<article>
			<p>买来给笔记本电脑连显示器的，原来笔记本显示器有点小就把它改成台式机+水冷了、目前使用很好，看电影也很爽、机箱买的400*300配电箱自己开孔 喷漆 全部自己搞，有空折腾下也挺好的</p>
			<small>白色,适用于iphone100</small>
		</article>
	</section>
</template>

<script>
	export default{
		data(){
			return{
				star:['static/image/shop/star.png','static/image/shop/star.png','static/image/shop/star.png','static/image/shop/star.png','static/image/shop/star.png'],
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.shop-assess-common{
		margin-top:40rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid $border-gray;
		header{
			display:flex;
			justify-content: space-between;
			.shop-assess-common-header-left{
				display: flex;
				align-items: center;
				.user-img{
					width: 50rpx;
					height: 50rpx;
					position: relative;
					top: 0;
				}
				div{
					margin-left: 20rpx;
					ul{
						li{
							float: left;
							img{
								width: 30rpx;
								height: 30rpx;
							}
						}
					}
				}
			}
			time{
				color: $uni-text-color-grey;
				font-size: 24rpx;
			}
		}
		article{
			p{
				font-size: 26rpx;
				margin-top: 20rpx;
			}
			small{
				display:block;
				margin-top: 20rpx;
				color: $uni-text-color-grey;
			}
		}
	}
</style>
