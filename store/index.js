import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
	tabsIndex:null,
	addressBack:null,
	uid:null,
	goodsData:{},
	OrderTagsIndex:0
  },

  mutations: {
	  getTabsIndex(state,tabsIndex){
		  state.tabsIndex = tabsIndex
	  },
	  getAddressBack(state,addressBack){
		   state.addressBack = addressBack
	  },
	  getUid(state,uid){
		  state.uid = uid
	  },
	  //存储首页数据
	  getShopDetail(state,goodsData){
	  		  state.goodsData = goodsData
	  },
	  //更新首页数据的商品数量
	  updataShopDetailCount(state,userCount){
			state.goodsData.userCount = userCount
	  },
	  //订单标签栏存储索引值
	  getTagsIndex(state,OrderTagsIndex){
	  		state.OrderTagsIndex = OrderTagsIndex
	  }
  },
  actions: {
  },
  modules: {
  }
})
export default store
