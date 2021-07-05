<template>
	<article class = "order-detail-address">
		<div class = "address-left">
			<span>{{goodsDetail.consignee}}</span>
			<span>{{goodsDetail.phone}}</span>
			<address>{{ads}}</address>
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
		data(){
			return{
				address:''
			}
		},
		mounted() {
			this.getAddress()
		},
		methods:{
			getAddress(){
				let address = this.goodsDetail.address.split(',')
				this.address = address[0] + ' ' + address[1] + ' ' + address[2] + ' ' + address[3]
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.order-detail-address{
		position: relative;
		padding: 20rpx 20rpx 20rpx 80rpx;
		background-color: #FFF;
		border-radius: 24rpx;
		margin-top: -20rpx;
		.address-left{
			&:before{
				content: '';
				height:44rpx;
				width: 44rpx;
				background: url(../../../static/image/order/icon-address.png) no-repeat;
				background-size: 44rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 20rpx;
			}
			span{
				&:nth-child(2){
					margin-left: 20rpx;
				}
			}
			address{
				font-style: normal;
				font-size: 26rpx;
				color:#8E8E8E;
			}
		}
	}
</style>
