<template>
	<article class = "set-address-main">
		<section>
			<span>收货人</span>
			<input type = "text" placeholder="请填写收货人姓名" v-model="address.name">
		</section>
		<section>
			<span>手机号码</span>
			<input type = "number" maxlength="11" placeholder="请填写手机号" v-model="address.telephone">
		</section>
		<section>
			<span>所在地区</span>
			<pick-regions @getRegion="handleGetRegion">
				<input style = "width: 100%" type = "text" placeholder="省市区县,乡镇等"  
						maxlength="0" v-model="address.city" disabled = "true">
			</pick-regions>
		</section>
		<section>
			<span>详细地址</span>
			<input type = "text" placeholder="街道,门牌号等" v-model="address.street">
		</section>
	</article>
</template>

<script>
    import pickRegions from '@/components/pick-regions/pick-regions.vue'
    export default {
        components:{ pickRegions },
        data(){
            return {
				address:{
					name:'',
					telephone:'',
					city:'',
					street:''
				}
            }
        },
		props:{
			addr:{
				type:Object,
				default(){
					return{}
				}
			},
			isFlag:{
				type:Number,
				default:1
			}
		},
		mounted() {
			this.setAddress()
		},
        methods:{
            // 获取选择的地区转化字符串
            handleGetRegion(region){
				this.address.city = region.map(item=>item.name).join(' ')
				console.log(this.address.city)
            },
			//存储父组件传递过来的地址数据
			setAddress(){
				if(this.isFlag === 0){
					this.address.name = this.addr.name
					this.address.telephone = this.addr.phone
					let addr = this.addr.address.split(',')
					this.address.street = addr[addr.length - 1]
					console.log( addr[addr.length - 1])
					this.address.city = addr.slice(0,addr.length - 1).toString().replace(/,/g," ")	
				}
			}
        }
    }
</script>

<style lang = "scss" scoped>
	.set-address-main{
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		section{
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1px solid #f5f5f5;
			span{
				width: 120rpx;
			}
			input{
				margin-left: 40rpx;
				font-size: 28rpx;
				width: calc(100% - 120rpx);
			}
		}
	}
</style>
