<template>
	<main id = "account-detail">
		<u-navbar title="账目明细" :custom-back = "accountDetailBack"></u-navbar>
		<account-detail-banner :sumAmt = "sumAmt" :tabsIndex= "tabsIndex"></account-detail-banner>
		<account-detail-tabs @tabsClick = "tabsClick" :current="tabsIndex"></account-detail-tabs>
		<scroll-view scroll-y="true" @scrolltolower = "rachBottom" ref = "scroll" :style = "{height: scrollHeight + 'px'}" id = "scrollView">
			<article v-if = "tabsIndex == 0" style = "padding-top: 10rpx;">
					<account-detail-item v-for = "(item,index) in accountDetailItem" :accountDetail = "item" :key = "index"
										 class = "account-detail-item"></account-detail-item>
			</article>
			<article v-if = "tabsIndex == 1" style = "padding-top: 10rpx;">
					<account-detail-item v-for = "(item,index) in accountDetailItem" :accountDetail = "item" :key = "index"
										 class = "account-detail-item"></account-detail-item>
			</article>
			<article v-if = "tabsIndex == 2" style = "padding-top: 10rpx;">
					<account-detail-item v-for = "(item,index) in accountDetailItem" :accountDetail = "item" :key = "index"
										 class = "account-detail-item"></account-detail-item>
			</article>
			<u-loadmore :status="status" v-if = "show"/>
			<article class = "no-page" v-if = "emptyShow">
				<img src = "~static/image/common/order-empty.png">
				<h5>明细为空</h5>
			</article>
		</scroll-view>
		<u-toast ref="uToast" />
	</main>
</template>

<script>
	import AccountDetailTabs from './common/AccountDetailTabs.vue'
	import AccountDetailItem from './common/AccountDetailItem.vue'
	import AccountDetailBanner from './common/AccountDetailBanner.vue'
	
	import {getToday,todayweekToday} from '../common/getDate.js'
	import {getAccountDetail} from '../network/getAccountDetail.js'
	
	export default {
		components:{
			AccountDetailTabs,
			AccountDetailItem,
			AccountDetailBanner
		},
		data(){
			return{
				tabsIndex:0,
				accountDetailItem:[],
				currentPage:1,
				pageSize:10,
				status: 'loadmore',
				isEnd:false,
				show:false,
				emptyShow:false,
				startDate:'',
				endDate:'',
				sumAmt:'',
				scrollHeight:0
			}
		},
		mounted(){
			this.getScrollHeight()
		},
		created() {
			this.startDate = getToday()
			this.endDate = getToday()
			this.getAccountDetail()
		},
		methods:{
			//获取当前scroll组件距离父元素顶部的距离
			getScrollHeight(){
				let clientHeight = null	 //页面的距离
				let scrollViewTop = null //该元素距离顶端的距离
				uni.getSystemInfo({
					success(res) {
						clientHeight = res.safeArea.bottom //获取视角高度
						console.log(clientHeight)
					}
				})
				let query = this.createSelectorQuery()
				query.select('#scrollView').boundingClientRect((rect) => {
					console.log(rect.top)
					scrollViewTop = rect.top
					this.scrollHeight = clientHeight - scrollViewTop
				}).exec()
			},
			//监听滚动底部
			rachBottom(){
				if(!this.isEnd){
					this.status = "loading"
					setTimeout(() => {
						this.getAccountDetail()
					},500)
				}
			},
			accountDetailBack(){
				uni.switchTab({
					url:"/pages/me/Me",
				})
			},
			//初始化数据
			InitializedData(){
				this.accountDetailItem = [],
				this.currentPage = 1,
				this.pageSize = 10,
				this.status = 'loadmore',
				this.isEnd = false,
				this.show = false,
				this.emptyShow = false
			},
			tabsClick(index){
				this.tabsIndex = index
				if(index == 0){
					this.InitializedData()
					this.startDate = getToday()
					this.endDate = getToday()
					this.getAccountDetail()
					console.log(this.startDate)
				}else if(index == 1){
					this.InitializedData()
					this.startDate = todayweekToday()
					this.endDate = getToday()
					this.getAccountDetail()
					console.log(this.startDate)
				}else{
					this.InitializedData()
					this.startDate = ''
					this.endDate = ''
					this.getAccountDetail()
				}
			},
			getAccountDetail(){
				let data = {
					currentPage:this.currentPage,
					pageSize:this.pageSize,
					startDate:this.startDate,
					endDate:this.endDate
				}
				getAccountDetail(data).then(res => {
					if(res.data.code === -2){
						this.$refs.uToast.show({title: '登陆失效,正在重新登陆至首页'})
					}else{
						this.show = true
						let data = JSON.parse(res.data.data)
						if(this.accountDetailItem.length == 0){
							this.accountDetailItem = data
							this.sumAmt = res.data.sumAmt
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
								this.accountDetailItem = this.accountDetailItem.concat(data)
								this.isEnd = true
								this.status = "nomore"
							}else{
								this.accountDetailItem = this.accountDetailItem.concat(data)
							}
						}
					}
					this.currentPage++
				})
			}
			
		}
	}
</script>

<style scoped lang = "scss">
	#account-detail{
		.account-detail-item{
			&:first-child{
				margin-top: 0;
			}
		}
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
