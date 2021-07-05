import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
	tabsIndex:null,
	addressBack:null
  },

  mutations: {
	  getTabsIndex(state,tabsIndex){
		  state.tabsIndex = tabsIndex
	  },
	  getAddressBack(state,addressBack){
		   state.addressBack = addressBack
	  }
  },
  actions: {
  },
  modules: {
  }
})
export default store
