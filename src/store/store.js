import Vuex from 'vuex'

export const store = new Vuex.Store({
  state: {
    isFarenheit: false,
    isDarkMode: true,
  },
  getters: {
    isFarenheit({ isFarenheit }) {
      return isFarenheit
    },
    isDarkMode({ isDarkMode }) {
      return isDarkMode
    },
  },
  mutations: {
    setTemperatureUnit(state, isFarenheit) {
      state.isFarenheit = isFarenheit
    },
    setDarkMode(state, isDarkMode) {
      state.isDarkMode = isDarkMode
    },
  },
})
