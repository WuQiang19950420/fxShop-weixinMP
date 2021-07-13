<template>
	<main class="shop-detail" :style = "{'padding-top':iphoneHeight + 'px'}">
		<u-navbar title="商品详情" :is-back = "false"></u-navbar>
		<shop-swiper :goodsDetailImg="goodsDetailImg"></shop-swiper>
		<shop-buy-area :goodsDetail="goodsDetail" :goods="goods"></shop-buy-area>
		<!-- 		<shop-discount></shop-discount> -->
		<shop-fast-mail-specs :address="address" @buy="buy"></shop-fast-mail-specs>
		<!-- 		<shop-assess></shop-assess> -->
		<look-more-shop-detail>
			<p>宝贝详情</p>
		</look-more-shop-detail>
		<shop-detail-img :goodsDetailImg="goods.body"></shop-detail-img>
		<div class="box"></div>
		<pay-fixed>
			<button @click="pay" class="pay-btn">立即购买</button>
		</pay-fixed>
		<u-popup v-model="show" mode="bottom" border-radius="18" height="900rpx">
			<shops-pop :goodsDetail="goodsDetail" :goods="goods" :goodsDetailImg="goodsDetailImg"></shops-pop>
		</u-popup>
		<u-toast ref="uToast" />
	</main>
</template>

<script>
	import ShopSwiper from './common/ShopSwiper.vue'
	import ShopBuyArea from './common/ShopBuyArea.vue'
	import ShopDiscount from './common/ShopDiscount.vue'
	import ShopFastMailSpecs from './common/ShopFastMailSpecs.vue'
	import ShopAssess from './common/ShopAssess.vue'
	import LookMoreShopDetail from '../common/LookMoreShopDetail.vue'
	import ShopDetailImg from './common/ShopDetailImg.vue'
	import PayFixed from '../common/PayFixed.vue'
	import ShopsPop from './common/ShopsPop.nvue'
	
	// import isIPhoneMixin from '../common/IsIphone.js'
	import {getLogin} from '../network/Login.js'
	import {getShops} from '../network/getWgoods.js'
	import {getAddress} from '../network/getAddress.js'

	export default {
		components: {
			ShopSwiper,
			ShopBuyArea,
			ShopDiscount,
			ShopFastMailSpecs,
			ShopAssess,
			ShopDetailImg,
			LookMoreShopDetail,
			PayFixed,
			ShopsPop
		},
		// mixins:[isIPhoneMixin],
		data() {
			return {
				show: false, //弹出框 默认不弹出
				goodsDetail: null,
				goodsDetailImg: [],
				goods: {},
				address: '',
				showNavbar:false,
				myUid:'',
				shareMsg:{
					imgUrl:'',
					title:'',
					desc:''					
				}
			}
		},
		created() {
			uni.showLoading({
			    title: '加载中'
			});	
		},
		onLoad(options) {
			console.log(options)
			if(options.id){
				this.$store.commit('getUid',options.id)
			}
			this.getShops()
		},
		onShow() {
			console.log(1)
			if(wx.getStorageSync('token')){
				this.getAddress() 
			}
		},
		methods: {
			onShareAppMessage() {
			 return {
				 title:this.shareMsg.title,
				 desc: this.shareMsg.desc,
				 path: `/pages/shop/ShopDetail?id=${this.myUid}`,
				 imageUrl:this.shareMsg.imgUrl
			 }
			},
			buy() {
				this.show = true
			},
			pay() {
				this.show = true
			},
			getShops() {
				let data = {
					uid: this.$store.state.uid || ' ',
					gid: 1
				}
				getShops(data).then(res => {
					let goodsDetail = JSON.parse(res.data.wdDetail)
					this.goods = JSON.parse(res.data.wGoods)
					this.goodsDetailImg = this.goods.resv2.split('|')
					this.goodsDetail = goodsDetail
					if(res.data.sessionId){
						wx.setStorageSync('sessionId',res.data.sessionId)
					}
					if(res.data.cuser && res.data.imgUrl && res.data.desc && res.data.title){
						let cuser = JSON.parse(res.data.cuser)
						this.myUid = cuser.uid
						this.shareMsg.imgUrl = res.data.imgUrl
						this.shareMsg.desc = res.data.desc
						this.shareMsg.title = res.data.title
					}
					uni.hideLoading()
				})
			},
			getAddress() {
				getAddress().then(res => {
					if(res.data.code === 1){
						let address = JSON.parse(res.data.address)
						if (address) {
							//如果右有默认地址就显示默认 没有就显示第一个
							for (let i = 0; i < address.length; i++) {
								if (address[i].isDefault == 1) {
									this.address = address[i].address
								} else {
									this.address = address[0].address
								}
							}
						} else {
							this.address.text = '地址栏占无地址'
						}
					}else if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在跳转'})
					}else{
						this.$refs.uToast.show({title:res.data.msg})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop-detail {
		p{
			color: $uni-text-color-grey;
			font-size: 26rpx;
			margin: 0 28rpx;
		}
		.pay-btn {
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
</style>
