<template>
	<u-tabs class = "tabs":list="list" :is-scroll="false" :current ="current" @change="tabsClick" active-color = "#f23030"></u-tabs>
</template>

<script>
	export default {
		props:{
			current:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				list: [{
					name: '今日收益'
				}, {
					name: '近七天收益'
				}, {
					name: '全部收益',
				}]
			}
		},
		methods: {
			tabsClick(index) {
				this.$emit('tabsClick',index)
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.tabs{
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	} 
</style>

