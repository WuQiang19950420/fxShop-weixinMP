<template>
	<main class = "order-detail">
		<u-navbar title="订单详情" :custom-back = "orderDetailBack"></u-navbar>
		<order-detail-state :goodsDetail = "goodsDetail"></order-detail-state>
		<order-detail-address :goodsDetail = "goodsDetail"></order-detail-address>
		<view class = "goods-information">
			<goods-information  :goodsData = "goodsDetail"></goods-information>
		</view>
		<order-detail-order-information :goodsDetail = "goodsDetail"></order-detail-order-information>
	</main>
</template>

<script>
	import OrderDetailState from './common/OrderDetailState.vue'
	import OrderDetailAddress from './common/OrderDetailAddress.vue'
	import GoodsInformation from '../common/GoodsInformation.vue'
	import OrderDetailOrderInformation from './common/OrderDetailOrderInformation.vue'
	import PayFixed from '../common/PayFixed.vue'
	export default{
		components:{
			OrderDetailState,
			OrderDetailAddress,
			GoodsInformation,
			OrderDetailOrderInformation,
			PayFixed
		},
		onLoad(option) {
			this.goodsDetail = JSON.parse(option.goodsDetail)
			this.index = option.index
		},
		data(){
			return{
				goodsDetail:{},
				index:null
			}
		},
		methods:{
			orderDetailBack(){
				uni.setStorageSync('indexs',parseInt(this.index));
				uni.switchTab({
					url:"/pages/order/Order"
				})
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.order-detail{
		.goods-information{
			background-color: #FFF;
			margin-top: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
		}
	}
	
</style>
