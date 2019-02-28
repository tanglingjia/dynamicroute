import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/routes'

Vue.use(Vuex)
const state = {
}

const store = new Vuex.Store({
  state,
  modules: { common }
})
export default store
