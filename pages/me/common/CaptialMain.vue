<template>
	<article class = "captial-main">
		<h3>我的资产</h3>
		<button @click="cash">提现</button>
		<div class = "captial-main-center">
			<div class = "captial-main-center-item">
				<text class = "text">余额</text>
				<text class = "price">￥<text>{{amt[0]}}</text>.{{amt[1] || '00'}}</text>
			</div>
			<div class = "captial-main-center-item">
				<text class = "text">冻结金额</text>
				<img class = "notice" @click = "notice" src = "/static/image/me/notice.png">
				<text class = "price">￥<text>{{frozenAmt[0]}}</text>.{{frozenAmt[1] || '00'}}</text>
			</div>
			<div class = "captial-main-center-item">
				<text class = "text">待结算</text>
				<img class = "notice-one" @click = "noticeOne" src = "/static/image/me/notice.png">
				<text class = "price">￥<text>{{settlementAmt[0]}}</text>.{{settlementAmt[1] || '00'}}</text>
			</div>
			<u-modal v-model="noticeShow" :content="content" :title="title"></u-modal>
			<u-modal v-model="show" title = "请输入提现金额:" :show-cancel-button = "true" @confirm = "confirm">
				<p>提现金额少于100元收手续费0.6%</p>
				<input class = "post-number-input" type="digit"
						placeholder="填写真实姓名" v-model="name" placeholder-style="color:#cbcbcb"/>
				<input class = "post-number-input" type="digit" 
						placeholder="填写金额" v-model="price" placeholder-style="color:#cbcbcb"/>
			</u-modal>
			<u-toast ref="uToast"/>
		</div>
	</article>
</template>

<script>
	import {NumberOneDig} from '../../common/Common.js'

	import {getCash} from '../../network/me.js'
	
	export default{
		data(){
			return {
				show:false,
				price:'',
				name:'',
				noticeShow:false,
				content:'',
				title:'',
				userDatas:{}
			}
		},
		props:{
			userData:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		mounted() {
			this.userDatas = this.userData
		},
		computed:{
			amt(){
				if(this.userDatas.amt == 0 || this.userDatas.amt){
					let amt = this.userDatas.amt.toString().split('.')
					return amt
				}
			},
			settlementAmt(){
				if(this.userDatas.settlementAmt == 0 || this.userDatas.settlementAmt){
					let settlementAmt = this.userDatas.settlementAmt.toString().split('.')
					return settlementAmt
				}
			},
			frozenAmt(){
				if(this.userDatas.frozenAmt == 0 || this.userDatas.frozenAmt){
					let frozenAmt = this.userDatas.frozenAmt.toString().split('.')
					return frozenAmt
				}
			}
		},
		methods:{
			//金额解释框
			notice(){
				this.noticeShow = true
				this.content = '用户购买后7日内申请了退款,此笔分销费用将会被冻结!'
				this.title = '冻结金额'
			},
			noticeOne(){
				this.noticeShow = true
				this.content = '用户购买完成后,分销金额会在3-7个工作日进行审核,完成后将会自动转入可提现余额中!'
				this.title = '待结算'
			},
			cash(){
				this.show = true
			},
			confirm(){
				let price = this.price
				let index = null
				let indexof = price.indexOf('.')
				//有无小数点
				if(indexof == -1){
					for(let i = 0;i < price.length;i++){
						if(price.charAt(i) != 0){
							index = i
							break
						}
					}
					price = price.slice(index)
				}else{
					let value = price.slice(0,indexof)
					let value1 = price.slice(indexof)
					if(value.length > 1){
						for(let i = 0;i < value.length;i++){
							if(value.charAt(i) != 0){
								value = value.slice(i)
								price = value + value1
								break
							}else if(value.charAt(value.length - 1) == 0){
								price = value.charAt(value.length - 1) + value1
								break
							}
						}
					}
				}
				if(price < 1){
					this.$refs.uToast.show({title:'金额必须大于1'})
					this.show = true
				}else if(!this.name){
					this.$refs.uToast.show({title:'请输入真实姓名'})
					this.show = true
				}else{
					this.getCash(price)
				}
			},
			getCash(price){
				let data = {
					name:this.name,
					amt:price
				}
				getCash(data).then(res => {
					if(res.data.code == 1){
						this.$refs.uToast.show({title:'提现成功'})
						this.$emit('upDataUser',price)
					}else{
						this.$refs.uToast.show({title:res.data.msg})
					}
				})
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.captial-main{
		background-image: linear-gradient(100deg,#ff4415,#f17b54);
		height: 300rpx;
		width: 95%;
		border-radius: 20rpx;
		margin: 0 auto;
		color: #FFFFFF;
		margin-top: 40rpx;
		padding: 30rpx;
		position: relative;
		button{
			background-color: #FFFFFF;
			position: absolute;
			width: 100rpx;
			height: 60rpx;
			right: 60rpx;
			top: 30rpx;
			line-height: 60rpx;
			border-radius: 28rpx;
			font-size: 28rpx;
		}
		h3{
			font-size: 38rpx;
		}
		.captial-main-center{
			display: flex;
			font-size: 34rpx;
			margin-top: 60rpx;
			.captial-main-center-item{
				display: flex;
				flex-direction: column;
				flex: 1;
				position:relative;
				.notice{
					position: absolute;
					top:6rpx;
					right: 0;
					width: 34rpx;
					height: 34rpx;
				}
				.notice-one{
					position: absolute;
					top:6rpx;
					right: 24rpx;
					width: 34rpx;
					height: 34rpx;
				}
				text{
					text-align: center;
				}
				.price{
					text{
						font-style: normal;
						font-size: 40rpx;
					}
					padding-right:20rpx;
				}
			}
		}
		p{
			color: #828282;
			font-size: 30rpx;
			text-align: center;
			margin-top: 20rpx;
		}
		.post-number-input{
			height: 100rpx;
			text-align: center;
			font-size: 38rpx;
			color: #000000;
		}
	}
</style>
