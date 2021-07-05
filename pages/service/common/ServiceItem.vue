<template>
	<section class = "order-item">
		<header>
			<h4>凯拉科技</h4>
			<div class = "order-item-header-right">
				<span :style = "{color:payStateColor}">{{payState}}</span>
				<div></div>
			</div>
		</header>
		<article>
			<div class = "order-item-content">
				<img :src = "product.image">
				<p>
					<span class = "product-name">{{product.name}}</span>
					<span class = "product-detail-name">型号:{{product.detailName}}</span>
				</p>
				<small>x{{product.count}}</small>
			</div>
			<div class = "order-item-price">
				<span>实付</span>
				<span>￥{{(product.count * product.selingprice).toFixed(2)}}</span>
			</div>
		</article>
		<footer>
			<button hover-class="none" v-if = "rightBtn" @click.stop = "rightBtnClick()">{{rightBtn}}</button>
		</footer>
		<u-toast ref="uToast" />
		<u-modal v-model="show"  title = "填写快递单号" 
				:show-cancel-button = "true" @confirm="confirm">
			<input class = "post-number-input" type = "number" v-model="postNumber" :focus = "true"/>
		</u-modal>
	</section>
</template>

<script>
	import {setRefundCode} from '../../network/Order.js'
	export default{
		props:{
			product:{
				type:Object,
				default(){
					return {}
				}
			},
			refundStatus:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				payStateColor:null ,//订单状态颜色
				rightBtn:null,
				show:false,
				postNumber:null
			}
		},
		computed:{
			payState(){
				console.log(this.refundStatus)
				switch(this.refundStatus){
					case 0:
						this.payStateColor = '#f23030'
						this.product.isNeed == 1?this.rightBtn = '填写快递单号':this.rightBtn = ''
						return '待退款'
					case 1:
						this.payStateColor = '#f23030'
						return '退款中'
					case 2:
						this.payStateColor = '#303133'
						return '退款成功'
					case 3:
						this.payStateColor = '#303133'
						return '退款失败'
					case 4:
						this.payStateColor = '#b4b4b4'
						return '退款关闭'
				}
			}
		},
		methods:{
			rightBtnClick(){
				if(this.payState == "待退款"){
					console.log('填写物流单号')
					this.show = true
				}
			},
			setRefundCode(){
				let data = {
					token:uni.getStorageSync('token'),
					oid:this.product.id,
					orderId:this.product.orderId,
					refundCode:this.postNumber
				}
				setRefundCode(data).then(res => {
					if(res.data.code == 1){
						this.$refs.uToast.show({title: '填写成功'})
					}else if(res.data.code == -2){
						this.$refs.uToast.show({title: '登陆失效,正在重新登陆至首页'})
					}else{
						this.$refs.uToast.show({title: '填写失败'})
					}
				})
			},
			confirm(){
				if(!this.postNumber){
					console.log(1)
					this.$refs.uToast.show({title: '物流单号不能为空'})
					this.show = true
				}else{
					this.setRefundCode()
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.order-item{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		header{
			display: flex;
			justify-content: space-between;
			h4{
				font-size: 32rpx;
				&:after{
					content:'';
					background-image: url(../../../static/image/common/enter.png);
					display: inline-block;
					background-repeat: no-repeat;
					width: 36rpx;
					height: 36rpx;
					position: relative;
					top:8rpx;
					background-size: cover;
				}
			}
			.order-item-header-right{
				display: flex;
				align-items: center;
/* 				div{
					&:before{
						content:'';
						display: inline-block;
						width: 1px;
						height: 22rpx;
						background-color: #979A9A;
						margin: 0 20rpx;
					}
					&:after{
						content:'';
						background-image: url(../../../static/image/order/delete-order.png);
						display: inline-block;
						background-repeat: no-repeat;
						width: 30rpx;
						height: 30rpx;
						position: relative;
						top:4rpx;
						background-size: cover;
					}
				} */
			}
		}
		article{
			margin-top: 40rpx;
			.order-item-content{
				display: flex;
				justify-content: space-between;
				align-items:center;
				img{
					width: 150rpx;
					height: 150rpx;
					border-radius: 12rpx;
				}
				p{
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					flex: 1;
					.product-name{
						overflow: hidden;
						 text-overflow: ellipsis;
						 display: -webkit-box;
						 -webkit-line-clamp: 2;
						 -webkit-box-orient: vertical;
					}
					.product-detail-name{
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #a6acb3;
					}
				}
				small{
					width: 100rpx;
					text-align: center;
					font-size: 14px;
					color: $uni-text-color-grey;
				}
			}
			.order-item-price{
				display: flex;
				justify-content: flex-end;
				span:nth-child(2){
					font-size: 16px;
					color: #151515;
				}
			}
		}
		footer{
			display: flex;
			justify-content: flex-end;
			margin-top: 30rpx;
			button{
				padding:0 10rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				border-radius: 40rpx;
				border:1px solid #494e52;
				margin-left: 40rpx;
				&:active{
					background-color: rgba(0,0,0,0.1);
				}
			}
		}
		.post-number-input{
			height: 100rpx;
			padding-left: 50rpx;
			font-size: 38rpx;
		}
	}
	.pay-state-active{
		color: $write-red;
	}
</style>
