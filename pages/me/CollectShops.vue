<template>
	<main class = "collect-shops">
		<u-navbar title="商品收藏">
			<div slot = "right" style = "padding-right: 30rpx;" @click = "navBarRight" >{{navBarRights}}</div>
		</u-navbar>
		<goods-information class = "goods-information position" @click.native = "goShopDetail"
						:isShowChoose = "isShowChoose" ref = "goodsInformation"  @chooseCollectShop = "chooseCollectShop" v-for = "(item,index) in a" :key = "index">
			
		</goods-information>
		<pay-fixed v-if = "isShowChoose">
			<div slot = "circle" class = "circle" @click = "chooseAllCollectShop">
				<div v-if = "chooseAllCollect"></div>
				<img v-else src = "/static/image/me/circle-choose.png">
				<span>全选</span>
			</div>
			<button @click = "collectShopsDelete">删除收藏</button>
		</pay-fixed>
	</main>
</template>

<script>
	import GoodsInformation from '../common/GoodsInformation.vue'
	import PayFixed from '../common/PayFixed.vue'
	export default{
		components:{
			GoodsInformation,
			PayFixed
		},
		data(){
			return{
				isShowChoose:false ,//是否显示全选的按钮
				chooseAllCollect:true, // 全选按钮是否被点击
				a:[1,2,3,4],
				navBarRights:'编辑'
			}
		},
		methods:{
			goShopDetail(){
				uni.navigateTo({
					url:'/pages/shop/ShopDetail'
				})
			},
			navBarRight(){
				this.isShowChoose = !this.isShowChoose
				this.navBarRights == '编辑'?this.navBarRights = '完成':this.navBarRights = '编辑'
			},
			collectShopsDelete(){
				console.log("我删除了")
			},
			chooseAllCollectShop(){
				//圆圈是否选中
				this.chooseAllCollect = !this.chooseAllCollect
				//让所有圆圈选中
				let ref = this.$refs.goodsInformation
				ref.forEach((item) => {
					//跳过已选中的
					if(this.chooseAllCollect == item.chooseCollect){ //当前组件的值 和 全选按钮的值判断 如果一样就跳过不需要更改
						return
					}
					item.chooseCollect = !item.chooseCollect
				})
			},
			//接受子组件传递的事件来修改父组件的全选按钮
			chooseCollectShop(){
				let ref = this.$refs.goodsInformation
				//IsAllChoose 判断用户有没有全选或者没选
				let IsAllChoose = ref.every(item => {
					return item.chooseCollect === false
				})
				if(IsAllChoose){
					this.chooseAllCollect = false
				}else{
					this.chooseAllCollect = true
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.collect-shops{
		.goods-information{
			background-color: #FFF;
			padding: 20rpx;
			border-radius: 20rpx;
			margin-top: 20rpx;
		}
		.circle{
			display: flex;
			position: absolute;
			top: 50%;
			left: 20rpx;
			transform: translateY(-50%);
			div,img{
				width: 40rpx;
				height: 40rpx;
			}
			div{
				border-radius: 100%;
				border: 1px solid #ADADAD;
			}
			span{
				margin-left: 20rpx;
			}
		}	
	}
</style>
