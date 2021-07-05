<template>
	<u-tabs class = "tabs":list="list" :current ="current" @change="tabsClick" active-color = "#f23030"></u-tabs>
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
				list: [ {
					name: '待退款'
				}, {
					name: '退款中',
				}, {
					name: '退款成功',
				}, {
					name: '退款失败',
				}, {
					name: '退款关闭',
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
		position: sticky;
		top: 44px;
		z-index: 1;
	}
	/* #endif */
</style>
