<template>
	<article class = "set-address-tags">
		<div class = "set-address-tags-top">
			<span>标签</span>
			<div>
				<ul class = "tags">
					<li v-for = "(item,index) in tags" :keys = "index" @click = "tagsClick(index)" :class="activeIndex==index ? 'active' : ''">{{item}}</li>
				</ul>
<!-- 				<ul class = "add-tags">
					<li>+</li>
				</ul> -->
			</div>
		</div>
		<div class = "set-address-tags-bottom">
			<div class = "default-address">
				<span>设置默认地址</span>
				<span>提醒:每次下单都会选择默认地址</span>
			</div>
			<div class = "switch">
				<u-switch v-model="checked" active-color="#f2270c" inactive-color = "#f2f2f2"size = "40" ></u-switch>
			</div>
		</div>
	</article>
</template>

<script>
	export default{
		data() {
			return {
				checked: false,
				tags:['家','公司','学校'],
				activeIndex:-1
			}
		},
		props:{
			tagsDate:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		computed:{
			check(){
				return this.checked?1:0
			}
		},
		watch:{
			tagsDate(newValue){
				if(newValue){
					this.checked = Boolean(parseInt(newValue.isDefault))
					this.activeIndex = parseInt(newValue.activeIndex)
				}
			}
		},
		methods:{
			tagsClick(index){
				 if(this.activeIndex == index){
					 this.activeIndex = -1
				 }else{
					 this.activeIndex=index
				 }
			}
		}
	}
</script>

<style lang = "scss"  scoped >
	.set-address-tags{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		border-radius: 20rpx;
		.set-address-tags-top{
			display: flex;
			span{
				width: 120rpx;
			}
			ul{
				display: flex;
				margin-left: 20rpx;
				li{
					border:1px solid #afafaf;
					border-radius: 30rpx;
					padding: 10rpx 30rpx;
					margin-left: 20rpx;
				}
			}
			.add-tags{
				margin-top: 20rpx;
				font-weight: 700;
			}
		}
		.set-address-tags-bottom{
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.default-address{
				display: flex;
				flex-direction: column;
				span{
					&:nth-child(2){
						color: #9c9c9c;
						font-size: 24rpx;
					}
				}
			}
			.switch{
				margin-right:40rpx;
			}
		}
	}
	.active{
		background-color: #55aaff;
		color:#FFFFFF;
	}
</style>
