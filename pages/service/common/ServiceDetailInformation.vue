<template>
	<article class = "service-information">
		<h5>退款信息</h5>
		<goods-information :goodsData = "serviceDetail"></goods-information>
		<div class = "service-information-top">
			<section>
				<h6>订单编号</h6><span>{{serviceDetail.orderId}}</span>
			</section>
			<section>
				<h6>订单时间</h6><span>{{serviceDetail.createTime}}</span>
			</section>
			<section>
				<h6>退款金额</h6><span>{{serviceDetail.collectAmt}}</span>
			</section>
		</div>
		</div>
	</article>
</template>

<script>
	import GoodsInformation from '../../common/GoodsInformation.vue'
	export default{
		components:{
			GoodsInformation
		},
		props:{
			serviceDetail: {
				type: Object,
				default () {
					return {}
				}
			}
		}
	}
</script>

<style lang = "scss"  scoped>
	.service-information{
		background-color: #FFF;
		border-radius: 22rpx;
		padding: 20rpx;
		h5{
			font-size: 32rpx;
			font-weight: 400;
			margin-bottom: 60rpx;
		}
		.service-information-top{
			margin-top: 50rpx;
			section{
				margin-top: 20rpx;
				display: flex;
				h6{
					color: #999;
					margin-right:40rpx;
					font-size: 26rpx;
				}
			}	
		}
	}
	
</style>
