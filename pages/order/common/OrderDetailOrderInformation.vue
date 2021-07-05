<template>
	<article class = "order-information">
		<h5>订单信息</h5>
		<div class = "order-information-top">
			<section>
				<h5>订单编号</h5><span>{{goodsDetail.orderId}}</span>
			</section>
			<section>
				<h5>下单时间</h5><span>{{goodsDetail.createTime}}</span>
			</section>
			<section>
				<h5>支付方式</h5><span>在线支付</span>
			</section>
			<section>
				<h5>配送方式</h5><span>快递</span>
			</section>
			<section>
				<h5>商品型号</h5><span>{{goodsDetail.detailName}}</span>
			</section>
			<section>
				<h5>订单备注</h5><span>{{goodsDetail.resv2}}</span>
			</section>
		</div>
		<div class = "order-infromation-bottom">
			<section>
				<h5>商品总额</h5><span>￥{{total}}</span>
			</section>
			<section>
				<h5>运费</h5><span>￥0.0</span>
			</section>
			<footer>
				<span>应付金额:</span>
				<span>￥{{total}}</span>
			</footer>
		</div>
	</article>
</template>

<script>
	export default{
		props:{
			goodsDetail: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed:{
			total(){
				return Number.isInteger(this.goodsDetail.collectAmt)?this.goodsDetail.collectAmt + '.00':this.goodsDetail.collectAmt
			}
		}
	}
</script>

<style lang = "scss"  scoped>
	.order-information{
		background-color: #FFF;
		border-radius: 22rpx;
		margin-top: 20rpx;
		padding: 20rpx;
		h5{
			font-size: 32rpx;
			font-weight: 400;
		}
		.order-information-top{
			section{
				margin-top: 20rpx;
				display: flex;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				h5{
					color: #999;
					margin-right:40rpx;
					font-size: 26rpx;
				}
			}	
		}
		.order-infromation-bottom{
			margin-top: 40rpx;
			section{
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				span{
					color: $price-red;
				}
			}
		}
		footer{
			text-align: right;
			margin-top:20rpx;
			font-size: 32rpx;
			span{
				&:nth-child(1){
					font-weight: 700;
				}
				&:nth-child(2){
					margin-left:20rpx;
					color: $price-red;
				}	
			}
		}
	}
	
</style>
