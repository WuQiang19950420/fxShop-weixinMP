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
					name: '全部订单'
				}, {
					name: '待付款'
				}, {
					name: '待发货',
				}, {
					name: '待收货',
				}, {
					name: '已完成',
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
	/* #ifdef H5*/
	.tabs{
		position: fixed;
		top: 44px;
		width: 100%;
		z-index: 1;
	}
	/* #endif */
</style>
