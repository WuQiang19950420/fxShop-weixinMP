<template>
	<main class = "captial">
		<u-navbar title="我的资产" :background="background" :border-bottom = "false"></u-navbar>
		<captial-main :userData = "userData" @upDataUser = "upDataUser"></captial-main>
	</main>
</template>

<script>
	import CaptialMain from './common/CaptialMain.vue'
	export default{
		components:{
			CaptialMain
		},
		data(){
			return{
				userData:{},
				background:{
					backgroundColor:'#F2F2F2'
				}
			}
		},
		onLoad(option) {
			this.userData = JSON.parse(option.userData)
		},
		methods:{
			upDataUser(price){
				this.userData.amt =  (this.userData.amt - price).toString()
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.captial{}
</style>
