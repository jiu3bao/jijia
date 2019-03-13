import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  barData : [],
  area_code: '',
  area_name: '',
  time: {
    te: '',
    ts: ''
  },
  qu_code: '',
  qu_name: '',
  show_qu: false,
  clear_token_timer: null,
  token: '',
  detail_cate: {}
}

const mutations = {
  SET_BAR_DATA (state, data: Array<any>) {
    state.barData = data
  },
  SET_AREA_CODE (state, data: string) {
    state.area_code = data
  },
  SET_TIME (state, data: any) {
    state.time = data
  },
  SET_AREA_NAME (state, data: string) {
    state.area_name = data
  },
  SET_QU_NAME (state, data: string) {
    state.qu_name = data
  },
  SET_QU_CODE (state, data: string) {
    state.qu_code = data
  },
  SET_SHOW_QU (state, data: boolean) {
    state.show_qu = data
  },
  SET_CLEAR_TOKEN_TIMER (state, data) {
    state.clear_token_timer = data
  },
  SET_TOKEN (state, data: string) {
    state.token = data
  },
  SET_DETAIL_CATE (state, data: any) {
    state.detail_cate = data
    console.log(data, 111111111111)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
