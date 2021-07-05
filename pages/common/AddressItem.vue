<template>
	<address class = "order-address">
		<p class= "order-address-tag">
			<span class = "order-address-default" v-if = "address.isDefault">默认</span>
			<span class = "order-address-tags" v-if = "address.type != -1">{{tags}}</span>
			{{addr}}
		</p>
		<p class = "order-address-middle">{{add}}</p>
		<p class = "order-phone-name">{{address.name}} {{address.phone}}</p>
		<div class = "set-address">
			<slot name = "set-address"></slot>
		</div>
		<slot name = "address-title">
				
		</slot>
	</address>
</template>

<script>
	export default{
		props:{
			address:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		computed:{
			add(){
				if(this.address.address){
					let address = this.address.address.split(',')
					return address[address.length - 1]
				}
			},
			tags(){
				switch(this.address.type){
					case -1:
						return ''
					case 0:
						return '家'
					case 1:
						return '公司'
					case 2:
						return '学校'
				}
			},
			addr(){
				if(this.address.address){
					let add = this.address.address.split(',')
					return add.slice(0,add.length - 1).toString().replace(/,/g," ")
				}
			}
		}
	}
</script>

<style lang = "scss" scoped>
	.order-address{
		font-style: normal;
		background-color: #FFF;
		border-bottom-right-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
		padding-top: 20rpx;
		position: relative;
		.set-address{
			position: absolute;
			right: 28rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 46rpx;
			height: 46rpx;
		}
		.order-address-tag{
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 20rpx;
			.order-address-default,.order-address-tags{
				color: #FFFFFF;
				border-radius: 10rpx;
				font-size: 26rpx;
			}
			.order-address-default{
				padding: 0 8rpx;
				background-color: $write-red;
				margin-right: 10rpx;
			}
			.order-address-tags{
				padding: 0 14rpx;
				background-color: #6699FF;
			}
		}
		.order-address-middle{
			margin-bottom: 10rpx;
			padding: 0 20rpx;
			font-weight: 700;
		}
		.order-phone-name{
			padding: 0 20rpx;
		}
	}
</style>