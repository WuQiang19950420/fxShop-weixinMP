<template>
	<view class = "goods-information">
		<h4>剀拉科技</h4>
		<div class = "shop-main-detail">
			<div class = "circle" @click.stop = "chooseCollectShop" v-if = "isShowChoose">
				<div v-if = "chooseCollect"></div>
				<img v-else src = "/static/image/me/circle-choose.png">
			</div>
			<img :src = "goodsData.goodsDetail.resv1 || goodsData.image">
			<div class = "shop-main-detail-right">
				<p>{{goodsData.goods.name || goodsData.name}}</p>
				<div class = "shop-main-detail-price">
					<span>￥<text>{{goodsData.goodsDetail.selingprice || goodsData.selingprice}}</text></span>
					<span>x{{goodsData.userCount || goodsData.count}}</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default{
		props:{
			isShowChoose:{
				type:Boolean,
				default:false
			},
			goodsData: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed:{
			isShowCircle(){
				if(!this.chooseAllCollect){
					return false
				}else{
					return true
				}
			}
		},
		data(){
			return{
				chooseCollect:true,//控制小圆圈是否点击
			}
		},
		methods:{
			chooseCollectShop(){
				this.chooseCollect = !this.chooseCollect
				this.$emit('chooseCollectShop') //发射事件 修改父组件全选按钮的值
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.goods-information{
		h4{
			margin-bottom: 20rpx;
		}
		.shop-main-detail{
			display: flex;
			.circle{
				width: 40%;
				position:relative;
				div,img{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top:50%;
					left:20%;
					transform: translateY(-50%);
				}
				div{
					border-radius: 100%;
					border: 1px solid #ADADAD;
				}
			}
			img{
				width: 230rpx;
				height: 150rpx;
				border-radius: 20rpx;
			}
			.shop-main-detail-right{
				margin-left:20rpx;
				p{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.shop-main-detail-price{
				margin-top: 20rpx;
				height: 50rpx;
				line-height: 50rpx;
				display: flex;
				justify-content: space-between;
				span{
					&:nth-child(1){
						color:$price-red;
						text{
							font-size: 38rpx;
						}
					}
				}
			}
		}
	}
</style>
