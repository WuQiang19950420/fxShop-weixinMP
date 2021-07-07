import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
	tabsIndex:null,
	addressBack:null,
	uid:null
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
	  }
  },
  actions: {
  },
  modules: {
  }
})
export default store
