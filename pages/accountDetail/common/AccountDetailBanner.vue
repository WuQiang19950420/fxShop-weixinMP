<template>
	<article class = "account-detail-banner">
		<h3 class = "text">{{index}}</h3>
		<div class = "price">
			<text>合计:<text class = "price-number">{{sumAmt || '0.00'}}</text></text>
		</div>
	</article>
</template>

<script>
	export default{
		props:{
			sumAmt:{
				type:String,
				default:''
			},
			tabsIndex:{
				type:Number,
				default:0
			}
		},
		computed:{
			index(){
				if(this.tabsIndex === 0){
					return '今日收益'
				}else if(this.tabsIndex === 1){
					return '近七天收益'
				}else{
					return '全部收益'
				}
			}
		}
	}
</script>

<style scoped  lang = "scss">
	.account-detail-banner{
		width: 98%;
		margin: 20rpx auto;
		height: 200rpx;
		border-radius: 20rpx;
		background-image: linear-gradient(140deg, #ff7575, #ff4415);
		text-align: center;
		color: #fff;
		border:1px solid transparent;
		.text{
			margin-top: 30rpx;
		}
		.price{
			margin-top:20rpx;
			.price-number{
				font-style: normal;
				margin-left: 10rpx;
			}
		}

	}
</style>
