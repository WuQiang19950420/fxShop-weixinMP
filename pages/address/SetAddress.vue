<template>
	<main class = "set-address">
		<u-navbar title="编辑收货地址" :custom-back = "setAddressBack">
			<div slot = "right" style = "padding-right: 10rpx;" @click = "deleteAddress" v-if = "!isFlag">删除</div>
		</u-navbar>
		<set-address-main ref = "setAddressMain" :addr = "address" :isFlag = "isFlag"></set-address-main>
		<set-address-tags ref = "setAddressTags" :tagsDate = "tags"></set-address-tags>
		<button class = "set-address-btn" @click="SetAddress">保存收货地址</button>
		<u-toast ref="uToast" />
	</main>
</template>

<script>
	import SetAddressMain from './common/SetAddressMain.vue'
	import SetAddressTags from './common/SetAddressTags.vue'
	
	import {setAddress,deleteAddress} from '../network/getAddress.js'
	export default{
		components:{
			SetAddressMain,
			SetAddressTags
		},
		data(){
			return{
				address:{},
				isFlag:1 ,//默认保存地址  0 修改地址
				tags:{
					activeIndex:null,
					isDefault:null
				}
			}
		},
		onLoad(option) {
			this.isFlag = parseInt(option.isFlag)
			if(option.isFlag == 0){
				this.address = JSON.parse(decodeURIComponent(option.address))
			}
			if(option.activeIndex && option.isDefault){
				this.tags.activeIndex = option.activeIndex
				this.tags.isDefault = option.isDefault
			}
		},
		methods:{
			setAddressBack(){
				uni.navigateTo({
					url:`/pages/address/AddressManage`
				})
			},
			deleteAddress(){
				let data = {
					id:this.address.id
				}
				deleteAddress(data).then(res => {
					if(res.data.code === 1){
						this.$refs.uToast.show({title:'删除成功'})
						setTimeout(() => {
							uni.navigateTo({
								url:`/pages/address/AddressManage`
							})
						},500)
					}
				})
			},
			SetAddress(){
				let address = this.$refs.setAddressMain.address
				if(!address.name){
					this.$refs.uToast.show({title:'请输入姓名'})
				}else if(address.telephone.length != 11){
					this.$refs.uToast.show({title:'手机格式不对'})
				}else if(!address.city || !address.street){
					this.$refs.uToast.show({title:'请输入地址'})
				}else{
					let arry = (address.city + ' ' + address.street).split(' ')
					if(this.isFlag == 1){
						let data = {
							address:arry,
							phone:address.telephone,
							name:address.name,
							isDefault:this.$refs.setAddressTags.check,
							type:this.$refs.setAddressTags.activeIndex
						}
						setAddress(data).then(res => {
							this.$refs.uToast.show({title:'保存成功'})
							setTimeout(() => {
								uni.navigateTo({
									url:`/pages/address/AddressManage`
								})
							},500)
						})
					}else{
						let data = {
							address:arry,
							phone:address.telephone,
							name:address.name,
							id:this.address.id,
							isDefault:this.$refs.setAddressTags.check,
							type:this.$refs.setAddressTags.activeIndex
						}
						setAddress(data).then(res => {
							this.$refs.uToast.show({title:'修改成功'})
							setTimeout(() => {
								uni.navigateTo({
									url:`/pages/address/AddressManage`
								})
							},500)
						})
					}
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.set-address{
		.set-address-btn{
			width: 70%;
			height: 80rpx;
			background-image: $pay-button;
			border-radius: 40rpx;
			line-height: 80rpx;
			color: #FFFFFF;
			margin: 0 auto;
			margin-top:400rpx
		}
	}
</style>
