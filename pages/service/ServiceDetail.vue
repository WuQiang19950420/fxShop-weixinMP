<template>
	<main>
		<u-navbar title="退款详情"></u-navbar>
		<service-detail-state :serviceDetail = "serviceDetail" :payState = "payState"></service-detail-state>
<!-- 		<service-flow @click.native = "goInServiceFlow" :serviceDetail = "serviceDetail"></service-flow> -->
		<service-detail-information :serviceDetail = "serviceDetail"></service-detail-information>
	</main>
</template>

<script>
	import ServiceDetailState from './common/ServiceDetailState'
	import ServiceDetailInformation from './common/ServiceDetailInformation'
	import ServiceFlow from './common/ServiceFlow'
	export default{
		components:{
			ServiceDetailInformation,
			ServiceDetailState,
			ServiceFlow
		},
		data(){
			return{
				serviceDetail:{},
				payState:null
			}
		},
		onLoad(option) {
			this.serviceDetail = JSON.parse(option.serviceDetail)
			this.payState = option.pageState
		},
		methods:{
			goInServiceFlow(){
				uni.navigateTo({
					url:"/pages/service/InServiceFlow"
				})
			}
		}
	}
</script>

<style>
</style>
