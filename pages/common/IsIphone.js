//判断全面屏
const isIPhoneMixin = {
	data(){
		return{
			iphoneHeight:0
		}
	},
	created() {
		this.isIphone()
	},
	methods:{
		isIphone(){
			let iphoneHeight = 0
			uni.getSystemInfo({
				success(res) {
					const model = res.model
					const iphone = model.indexOf('iPhone X') !== -1 || model.indexOf('iPhone 12') !== -1
					if(iphone){
						iphoneHeight = 44
					}else{
						iphoneHeight = 0
					}
				}
			})
			this.iphoneHeight = iphoneHeight
		}
	}
}

export default isIPhoneMixin