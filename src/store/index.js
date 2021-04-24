import Vue from 'vue'
import Vuex from 'vuex'
import payments from './modules/payments'
import students from './modules/students'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    payments,
    students
  }, 
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})