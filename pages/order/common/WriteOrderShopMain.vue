<template>
	<article class = "write-order-shop-main">
		<goods-information :goodsData = "goodsData"></goods-information>
		<div class = "shop-main-other">
			<section>
				<span>购买数量</span>
				<div class = "shops-count-input">
					<span class = "incream" @click = "incream" v-if = "increamActive">
						<img src = "/static/image/shop/incream.png">
					</span>
					<span class = "incream" @click = "incream" v-else>
						<img src = "/static/image/shop/no-incream.png">
					</span>
					<input  ref = "countInput" v-model = "count" @focus = "inputBlur" type="number">
					<span class = "add" @click = "add" v-if = "addActive">
						<img src = "/static/image/shop/add.png">
					</span>
					<span class = "add" @click = "add" v-else>
						<img src = "/static/image/shop/no-add.png">
					</span>
				</div>
			</section>
			<section>
				<span>配送方式</span>
				<span class = "right">快递</span>
			</section>
			<section>
				<span>运费</span>
				<span style = "margin-right: 38rpx;">免运费</span>
			</section>
<!-- 			<section>
				<span>优惠券</span>
				<span class = "right">没有</span>
			</section> -->
			<section class = "shop-main-other-input">
				<span>订单备注</span>
				<input type = "text" placeholder="选填" v-model="remark">
			</section>
		</div>
		<footer>
			总计：<em>￥{{allPrice}}</em>
		</footer>
	</article>
</template>

<script>
	import GoodsInformation from '../../common/GoodsInformation.vue'
	export default{
		props: {
			goodsData: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		components:{
			GoodsInformation
		},
		created() {
			this.count = this.$store.state.goodsData.userCount
		},
		mounted() {
			if(this.count > 1){
				this.increamActive = true
			}
		},
		computed:{
			allPrice(){
				if(this.goodsData){
					let allPrice = this.goodsData.goodsDetail.selingprice * this.count
					return allPrice.toFixed(2)
				}
			}
		},
		data(){
			return{
				isActive:false,
				increamActive:false,
				addActive:true,
				remark:'',
				count:null,
			}
		},
		watch:{
			count(newValue){
				this.$store.commit('updataShopDetailCount',newValue)
			}
		},
		methods:{
			shopsChoose(){
				this.isActive?this.isActive = false:this.isActive = true
			},
			incream(){
				if(this.count < 2){
					this.increamActive = false
				}else{
					this.count--
				}
			},
			add(){
				this.increamActive = true
				this.count++
			},
			inputBlur(){
				this.count = this.count
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.write-order-shop-main{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 0 20rpx;
		.shop-main-other{
			section{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 40rpx;
				.shops-count-input{
					display: flex;
					justify-content: flex-end;
					.add,.incream{
						display: flex;
						img{
							width: 30rpx;
							height: 30rpx;
						}
					}
					.add{
						margin-left: 20rpx;
					}
					.incream{
						margin-right: 20rpx;
					}
					input{
						height: 40rpx;
						width: 60rpx;
						background-color: #F2F2F2;
						text-align: center;
						border-radius: 10rpx;
					}
				}
				.right{
					margin-right: 40rpx;
					position: relative;
					&:after{
						content: "";
						position: absolute;
						display: inline-block;
						width: 18rpx;
						height: 18rpx;
						border-top: 4rpx solid #ccc;
						border-left: 4rpx solid #ccc;
						top: 50%;
						transform: translate(0,-50%) rotate(135deg);
						right:-32rpx;
					}
				}
			}
			.shop-main-other-input{
				justify-content: flex-start;
				height: 40rpx;
				input{
					margin-left: 40rpx;
					height: 40rpx;
					font-size: 28rpx;
				}
			}
		}
		footer{
			height: 80rpx;
			display: flex;
			justify-content: flex-end;
			line-height: 80rpx;
			position: relative;
			margin-top: 40rpx;
			padding-right: 80rpx;
			em{
				font-style: normal;
				color:$price-red;
				font-size: 32rpx;
				
			}
			&:before{
				content: "";
				position: absolute;
				z-index: 1;
				pointer-events: none;
				background-color: #e5e5e5;
				height: 1px;
				left: 0;
				right: 0;
				top: 0;
				left: 10px;
				right: 10px;
			}
		}
	}
</style>
