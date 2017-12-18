import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  userId: '',
  menuList: [{
    children: []
  }],
  sysUser:{
    accounts: ''
  },
  roleName: '',
  permissionName: []
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
