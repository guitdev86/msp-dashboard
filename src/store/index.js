import Vue from "vue";
import Vuex from "vuex";
import payments from "./modules/payments";
import students from "./modules/students";
import lessons from "./modules/lessons";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lessons,
    payments,
    students
  },
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
