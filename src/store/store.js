import Vuex from 'vuex'

export const store = new Vuex.Store({
  state: {
    isFarenheit: false,
  },
  getters: {
    isFarenheit({ isFarenheit }) {
      return isFarenheit
    },
  },
  mutations: {
    setTemperatureUnit(state, isFarenheit) {
      state.isFarenheit = isFarenheit
    },
  },
})
