<template>
	<main>
		<me-header :userData = "userData" :showUser = "showUser"></me-header>
		<me-order></me-order>
		<me-capital :userData = "userData"></me-capital>
		<me-icon></me-icon>
<!-- 		<look-more-shop-detail>
			<p>为您推荐</p>
		</look-more-shop-detail>
		<me-more-shops></me-more-shops> -->
	</main>
</template>

<script>
	import MeHeader from './common/MeHeader.vue'
	import MeOrder from './common/MeOrder.vue'
	import MeIcon from './common/MeIcon.vue'
	import MeCapital from './common/MeCapital.vue'
	import MeMoreShops from './common/MeMoreShops.vue'
	import LookMoreShopDetail from '../common/LookMoreShopDetail.vue'
	
	import {getUser} from '../network/me.js'
	export default{
		components:{
			MeHeader,
			MeOrder,
			MeCapital,
			MeIcon,
			MeMoreShops,
			LookMoreShopDetail
		},
		data(){
			return{
				userData:{},
				showUser:false
			}
		},
		onShow(){
			if(wx.getStorageSync('token')){
				this.getUser()
			}
		},
		methods:{
			getUser(){
				getUser().then(res => {
					this.userData = res.data.user
					this.showUser = true
				})
			}
		}
	}
</script>

<style>
</style>
