<template>
	<main class = "address-manage">
		<u-navbar title="地址管理" :custom-back = "addressManageBack"></u-navbar>
		<address-item class = "address-item" v-for = "(item,index) in address" :key = "index" @click.native = "chooseAddress(index)" :address = "item">
			<img slot = "set-address"src = "/static/image/address/set-address.png" @click.stop = "setAddress(index)">
		</address-item>
		<button class = "add-address-btn" @click="goSetAddress">新建收货地址</button>
	</main>
</template>

<script>
	import AddressItem from '../common/AddressItem.vue'
	
	import {getAddress} from '../network/getAddress.js'
	export default{
		components:{
			AddressItem
		},
		onLoad(option){
			console.log(option)
			if(option.goodsDetail && option.goods && option.userCount){
				this.goodsDetail = JSON.parse(decodeURIComponent(option.goodsDetail));
				this.goods = JSON.parse(decodeURIComponent(option.goods));
				this.userCount = parseInt(option.userCount)
			}
		},
		created() {
			this.getAddress()
		},
		data(){
			return{
				address:[],
				goodsDetail:null,
				goods:null,
				userCount:null
			}
		},
		methods:{
			addressManageBack(){
				if(this.$store.state.addressBack == 1){
					console.log(1)
					uni.switchTab({
						url:"/pages/me/Me"
					})
				}else{
					let goodsDetail = encodeURIComponent(JSON.stringify(this.goodsDetail))
					let goods = encodeURIComponent(JSON.stringify(this.goods))
					let userCount = parseInt(this.userCount)
					uni.navigateTo({
						url: `/pages/order/WriteOrder?goodsDetail=${goodsDetail}&goods=${goods}&userCount=${userCount}`
					})
				}
			},
			getAddress(){
				let data = {
					token:uni.getStorageSync('token')
				}
				getAddress(data).then( res => {
					console.log(res.data)
					this.address = JSON.parse(res.data.address)
				})
			},
			//修改地址
			setAddress(index){
				let address = encodeURIComponent(JSON.stringify(this.address[index]))
				let goodsDetail = encodeURIComponent(JSON.stringify(this.goodsDetail))
				let goods = encodeURIComponent(JSON.stringify(this.goods))
				let userCount = parseInt(this.userCount)
				console.log((this.address[index]))
				uni.navigateTo({
					url:`/pages/address/SetAddress?address=${address}&isFlag=0&goodsDetail=${goodsDetail}&goods=${goods}&userCount=${userCount}`
				})
			},
			//新建地址
			goSetAddress(){
				let address = encodeURIComponent(JSON.stringify(this.address[0]))
				let goodsDetail = encodeURIComponent(JSON.stringify(this.goodsDetail))
				let goods = encodeURIComponent(JSON.stringify(this.goods))
				let userCount = parseInt(this.userCount)
				uni.navigateTo({
					url:`/pages/address/SetAddress?isFlag=1&address=${address}&goodsDetail=${goodsDetail}&goods=${goods}&userCount=${userCount}`
				})
			},
			chooseAddress(index){
				if(this.$store.state.addressBack != 1){
					let goodsDetail = encodeURIComponent(JSON.stringify(this.goodsDetail))
					let goods = encodeURIComponent(JSON.stringify(this.goods))
					let userCount = parseInt(this.userCount)
					uni.navigateTo({
						url: `/pages/order/WriteOrder?goodsDetail=${goodsDetail}&goods=${goods}&userCount=${userCount}&addressIndex=${index}`
					})
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.address-manage{
		.address-item{
			border-radius: 0;
			border-bottom: 1px solid #F2F2F2;
			padding-bottom: 20rpx;
			img{
				width: 46rpx;
				height: 46rpx;
			}
		}
		.add-address-btn{
			width: 70%;
			height: 80rpx;
			background-image: $pay-button;
			border-radius: 40rpx;
			line-height: 80rpx;
			color: #FFFFFF;
			position: absolute;
			bottom: 50rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
