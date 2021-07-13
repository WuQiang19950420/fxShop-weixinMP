<template>
	<main class = "write-order">
		<u-navbar title="填写订单" :custom-back = "writeOrderBack"></u-navbar>
		<address-item @click.native = "chooseAddress" :address="address">
			 <div slot = "address-title" class = "address-title"></div>
		</address-item>
		<write-order-shop-main ref = "writeOrderShopMain" :goodsData = "goodsData"></write-order-shop-main>
		<pay-fixed class = "pay-bottom">
			<button @click = "commitOrder">提交订单</button>
		</pay-fixed>
		<u-modal v-model="show" :content="content" 
				confirm-text = "去设置" confirm-color = "#f23030" title = "温馨提示" 
				:show-cancel-button = "true" cancel-text = "返回" @confirm = "confirm" 
				@cancel="cancel"></u-modal>
		<u-toast ref="uToast" />
	</main>
</template>

<script>
	import AddressItem from '../common/AddressItem.vue'
	import WriteOrderShopMain from './common/WriteOrderShopMain.vue'
	import PayFixed from '../common/PayFixed.vue'
	
	import {getAddress} from '../network/getAddress.js'
	import {placeOrder} from '../network/Order.js'
	export default{
		onLoad(option){
			if(option.addressIndex){
				this.addressIndex = option.addressIndex
			}
		},
		data(){
			return {
				goodsData:{},
				address:{},
				show:false,
				content: '你还没有收货地址,赶快设置一下吧',
				addressIndex:0  ,//选择地址下标
				remark:'',
				isAddKeybordHeight:false
			}
		},
		components:{
			AddressItem,
			WriteOrderShopMain,
			PayFixed
		},
		created() {
			this.getAddress()
			this.getVueXShopDetail()
		},
		methods:{
			//获取vuex里的数据
			getVueXShopDetail(){
				this.goodsData = this.$store.state.goodsData
			},
			writeOrderBack(){
				uni.switchTab({
					url:"/pages/shop/ShopDetail"
				})
			},
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			confirm(){
				uni.navigateTo({
					url:`/pages/address/SetAddress?isFlag=1`
				})
			},
			getAddress(){
				getAddress().then(res => {
					let address = JSON.parse(res.data.address)
					if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在跳转'})
					}else{
						if(address.length === 0){
							this.show = true
						}else{
							this.address = address[this.addressIndex]
						}
					}
				})
			},
			//提交订单
			commitOrder(){
				let remark = this.$refs.writeOrderShopMain.remark
				let data = {
					gdid:this.goodsData.goodsDetail.id,
					count:this.$store.state.goodsData.userCount,
					addId:this.address.id,
					remark:remark,
					tranType:1
				}
				placeOrder(data).then(res => {
					const _this = this
					if(res.data.code === 1){
						wx.requestPayment({
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package, 
							signType: res.data.signType,
							paySign: res.data.paySign,
							success (res) {
								_this.paySuccess()
							},
							fail (err) {
								_this.payErro()
							}
						})
					}else{
						this.$refs.uToast.show({title:res.data.msg})
					}
				})
			},
			//支付成功的回调函数
			paySuccess(){
				uni.setStorageSync('indexs',2);
				uni.switchTab({
					url:"/pages/order/Order"
				})
			},
			//支付失败的回调函数
			payErro(){
				uni.setStorageSync('indexs', 1);
				uni.switchTab({
					url:"/pages/order/Order"
				})
			},
			chooseAddress(){
				this.$store.commit('getAddressBack',2)
				uni.navigateTo({
					url:`/pages/address/AddressManage`
				})
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.write-order{
		.address-title{
			margin-top: 10rpx;
			background: url(../../static/image/order/addressTitle.png) no-repeat;
			background-size:contain;
			height:14rpx;
			margin-top:20rpx;
		}
		.pay-bottom{
			bottom: 0;
			button{
				width: 200rpx;
				height: 76rpx;
				background-image: $pay-button;
				border-radius: 40rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 76rpx;
				font-size: 28rpx;
			}
		}
	}
	.add-keybord-height{
		margin-top: -300rpx;
		transition: all .4s;
	}
</style>
