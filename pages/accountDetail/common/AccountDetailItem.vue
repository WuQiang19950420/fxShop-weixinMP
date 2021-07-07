<template>
	<section class = "account-detail-item">
		<div class = "detail-item-left">
			<div class = "flex">
				<div class = "user-img">
					<img :src = "accountDetail.headUrl">
				</div>
				<h5>{{accountDetail.wxname}}</h5>
			</div>
			<p>{{accountDetail.createDate}}</p>
		</div>
		<div class = "detail-item-right">
			<div class = "refund" v-if = "accountDetail.refundStatus == 2">
				<span>订单已退款</span>
				<img class = "notice" @click = "notice" src = "/static/image/me/notice.png">
			</div>
			<div class = "price"> 
				<span>+</span><text>{{accountDetail.shareAmt}}</text>
			</div>
		</div>
		<u-toast ref="uToast" />
	</section>
</template>

<script>
	export default{
		props:{
			accountDetail:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		methods:{
			notice(){
				this.$refs.uToast.show({title: '对于支付成功并且用户已经退款的订单，收益金额将会结算到用户冻结金额中，并且不可提现'})
			}
		}
	}
</script>

<style scoped lang = "scss">
	.account-detail-item{
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		margin-top: 10rpx;
		.detail-item-left{
			flex: 1;
			.flex{
				display: flex;
				align-items: center;
				.user-img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				h5{
					font-size: 26rpx;
					font-weight: 400;
					margin-left: 20rpx;
				}
			}
			p{
				margin-top: 30rpx;
				margin-left: 40rpx;
				font-size: 24rpx;
				color: #A8B3C4;
			}
		}
		.detail-item-right{
			.refund{
				position: absolute;
				top: 10rpx;
				right: 40rpx;
				font-size: 26rpx;
				color: #757c8b;
				.notice{
					width: 30rpx;
					height: 30rpx;
					position: relative;
					bottom: 2rpx;
					vertical-align: middle; 
				}
			}
			.price{
				color:$price-red;
				font-size: 36rpx;
				margin-right: 20rpx;
				em{
					font-style: normal;
				}
			}
		}
	}
</style>
