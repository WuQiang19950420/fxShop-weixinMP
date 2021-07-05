<template>
	<main class = "service">
		<u-navbar title="退换"></u-navbar>
		<service-tabs @tabsClick = "tabsClick" :current="pageIndex"></service-tabs>
		<article v-if = "pageIndex == 0">
			<service-item @click.native = "goServiceDetail(index)" 
						v-for = "(item,index) in ServiceItem" :product = "item" 
						:refundStatus = "pageIndex" :key = "item.id" 
						@updataServiceItem = "updataServiceItem"></service-item>
		</article>
		<article v-if = "pageIndex == 1">
			<service-item @click.native = "goServiceDetail(index)" 
						v-for = "(item,index) in ServiceItem" :product = "item" 
						:refundStatus = "pageIndex" :key = "item.id" 
						@updataServiceItem = "updataServiceItem"></service-item>
		</article>
		<article v-if = "pageIndex == 2">
			<service-item @click.native = "goServiceDetail(index)" 
						v-for = "(item,index) in ServiceItem" :product = "item" 
						:refundStatus = "pageIndex" :key = "item.id" 
						@updataServiceItem = "updataServiceItem"></service-item>
		</article>
		<article v-if = "pageIndex == 3">
			<service-item @click.native = "goServiceDetail(index)" 
						v-for = "(item,index) in ServiceItem" :product = "item" 
						:refundStatus = "pageIndex" :key = "item.id"
						@updataServiceItem = "updataServiceItem"></service-item>
		</article>
		<article v-if = "pageIndex == 4">
			<service-item @click.native = "goServiceDetail(index)"
						v-for = "(item,index) in ServiceItem" :product = "item" 
						:refundStatus = "pageIndex" :key = "item.id"
						@updataServiceItem = "updataServiceItem"></service-item>
		</article>
		<u-loadmore :status="status" v-if = "show"/>
		<article class = "no-page" v-if = "emptyShow">
			<img src = "~static/image/common/order-empty.png">
			<h5>订单为空</h5>
		</article>
	</main>
</template>

<script>
	import ServiceTabs from './common/ServiceTabs.vue'
	import ServiceItem from './common/ServiceItem.vue'
	
	import {getOrder} from '../network/Order.js'
	export default{
		components:{
			ServiceTabs,
			ServiceItem
		},
		data(){
			return {
				pageIndex:0,//页面切换 默认0
				ServiceItem:[],
				currentPage:1,
				pageSize:5,
				status: 'loadmore',
				isEnd:false,
				show:false,
				emptyShow:false
			}
		},
		created() {
			this.getOrder()
		},
		methods:{
			//tab标签栏切换
			tabsClick(index){
				this.pageIndex = index
				this.currentPage = 1
				this.ServiceItem = []
				this.show = false
				this.isEnd = false
				this.emptyShow = false
				this.load = 'loadmore';
				this.getOrder()
			},
			goServiceDetail(index){
				let serviceItem = JSON.stringify(this.ServiceItem[index])
				uni.navigateTo({
					url:`/pages/service/ServiceDetail?serviceDetail=${serviceItem}&pageState=${this.pageIndex}`
				})
			},
			getOrder(){
				let data = {
					type:5,
					currentPage:this.currentPage,
					pageSize:this.pageSize,
					refundStatus:this.pageIndex
				}
				getOrder(data).then(res => {
					if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在重新登陆至首页'})
					}else{
						this.show = true
						let data = JSON.parse(res.data.data)
						if(this.ServiceItem.length == 0){
							this.ServiceItem = data
							if(data.length < this.pageSize && data.length > 0){
								this.isEnd = true
								this.status = "nomore"
							}
							else if(data.length === 0){
								this.emptyShow = true
								this.show = false
							}
						}
						else{
							if(data.length === 0 || data.length < this.pageSize){
								this.ServiceItem = this.ServiceItem.concat(data)
								this.isEnd = true
							}else{
								this.ServiceItem = this.ServiceItem.concat(data)
								console.log(this.ServiceItem)
							}
						}
					}
					this.currentPage++
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service{
		.no-page{
			margin:0 auto;
			text-align:center;
			margin-top: 340rpx;
			img{
				width: 200rpx;
				height: 200rpx;
			}
			h5{
				color:#bfbfbf;
				font-size:30rpx;
				margin-top:10rpx;
			}
		}
	}
</style>
