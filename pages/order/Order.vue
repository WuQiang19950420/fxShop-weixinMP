<template>
	<main class = "order" v-if= "isLogin">
		<u-navbar title="我的订单" :is-back = "false"></u-navbar>
		<order-tabs @tabsClick = "tabsClick" :current="tabIndex"></order-tabs>
		<article v-if = "tabIndex == 0" >
			<order-item @click.native = "goOrderDetail(index)" 
						v-for = "(item,index) in orderItem" :product = "item" :key = "item.id" 
						@updataOrderItem = "updataOrderItem" @deleteItem = "deleteItem" 
						:tabIndex = "tabIndex" :index = "index"></order-item>
		</article>
		<article v-if = "tabIndex == 1" >
			<order-item @click.native = "goOrderDetail(index)" 
						v-for = "(item,index) in orderItem" :product = "item" :key = "item.id" 
						@updataOrderItem = "updataOrderItem" @deleteItem = "deleteItem" 
						:tabIndex = "tabIndex" :index = "index"></order-item>
		</article>
		<article v-if = "tabIndex == 2" >
			<order-item @click.native = "goOrderDetail(index)" 
						v-for = "(item,index) in orderItem" :product = "item" :key = "item.id" 
						@updataOrderItem = "updataOrderItem" @deleteItem = "deleteItem" 
						:tabIndex = "tabIndex" :index = "index"></order-item>
		</article>
		<article v-if = "tabIndex == 3" >
			<order-item @click.native = "goOrderDetail(index)" 
						v-for = "(item,index) in orderItem" :product = "item" :key = "item.id"
						@updataOrderItem = "updataOrderItem" @deleteItem = "deleteItem" 
						:tabIndex = "tabIndex" :index = "index" @changeTabsIndex = "changeTabsIndex"></order-item>
		</article>
		<article v-if = "tabIndex == 4" >
			<order-item @click.native = "goOrderDetail(index)"
						v-for = "(item,index) in orderItem" :product = "item" :key = "item.id"
						@updataOrderItem = "updataOrderItem" @deleteItem = "deleteItem" 
						:tabIndex = "tabIndex" :index = "index"></order-item>
		</article>
		<div style = "height: 10rpx;"></div>
		<u-loadmore :status="status" v-if = "show"/>
		<article class = "no-page" v-if = "emptyShow">
			<img src = "~static/image/common/order-empty.png">
			<h5>订单为空</h5>
		</article>
		<u-toast ref="uToast" />
	</main>
</template>

<script>
	import OrderTabs from './common/OrderTabs.vue'
	import OrderItem from './common/OrderItem.vue'
	
	import {getOrder} from '../network/Order.js'
	export default{
		components:{
			OrderTabs,
			OrderItem
		},
		data(){
			return{
				tabIndex:null ,//页面切换 默认0
				orderItem:[],
				currentPage:1,
				pageSize:5,
				status: 'loadmore',
				isEnd:false,
				show:false,
				emptyShow:false,
				isLogin:true
			}
		},
		onShow(){
			if(wx.getStorageSync('token')){
				uni.showLoading({
					title: '加载中',
					mask:'true'
				})
				this.tabIndex = this.$store.state.OrderTagsIndex
				this.currentPage = 1
				this.orderItem = []
				this.show = false
				this.isEnd = false
				this.emptyShow = false
				this.status = 'loadmore'
				this.getOrder()
			}else{
				this.isLogin = false
				uni.navigateTo({
					url:'../login/MpWxLogin'
				})
				setTimeout(() => {
					this.isLogin = true
				},1000)
			}

		},
		onReachBottom(){
			if(!this.isEnd){
				this.status = "loading"
				setTimeout(() => {
					this.getOrder()
				},500)
			}
		},
		methods:{
			//取消订单 删除对应的数据
			deleteItem(itemIndex){
				this.orderItem.splice(itemIndex,1)
				this.$refs.uToast.show({title: '取消成功'})
			},
			//每次操作订单重新请求数据
			updataOrderItem(){
				setTimeout(() => {
					this.getOrder()
				},300)
			},
			//tab标签栏切换
			tabsClick(index){
				this.tabIndex = index
				this.$store.commit('getTagsIndex',index)
				this.initData()
				uni.showLoading({
					title: '加载中'
				})
				this.getOrder()
			},
			//页面初始化
			initData(){
				this.currentPage = 1
				this.orderItem = []
				this.show = false
				this.isEnd = false
				this.emptyShow = false
				this.status = 'loadmore'
			},
			changeTabsIndex(){
				this.tabIndex = 4
				this.initData()
				this.getOrder()
			},
			goOrderDetail(index){
				let orderItem = JSON.stringify(this.orderItem[index])
				this.$store.commit('getTagsIndex',this.tabIndex)
				uni.navigateTo({
					url:`/pages/order/OrderDetail?goodsDetail=${orderItem}`
				})
			},
			getOrder(){
				let data = {
					type:this.tabIndex,
					currentPage:this.currentPage,
					pageSize:this.pageSize
				}
				getOrder(data).then(res => {
					if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在跳转'})
					}else{
						this.show = true
						let data = JSON.parse(res.data.data)
						if(this.orderItem.length == 0){
							this.orderItem = data
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
								this.orderItem = this.orderItem.concat(data)
								this.isEnd = true
								this.status = "nomore"
							}else{
								this.orderItem = this.orderItem.concat(data)
							}
						}
					}
					this.currentPage++
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.order{
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
