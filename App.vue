<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang = "scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "css/iconfont.css";
    * {
        box-sizing: border-box;
    }
    *::before,*::after{
   		box-sizing: border-box;
    }
	page{
		background-color:#F2F2F2;
	}
	ul{
		padding: 0;
		margin: 0;
	}
	li{
		list-style-type: none;
	}
	button{
		border: none;
		background-color: transparent;
		outline: none;
		margin: 0;
		padding: 0;
	}
	uni-button:after{
		border: none;
	}
</style>
