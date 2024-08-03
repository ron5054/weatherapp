import Vuex from 'vuex'

export const store = new Vuex.Store({
  state: {
    isFarenheit: false,
    isDarkMode: true,
    message: null,
  },
  getters: {
    isFarenheit({ isFarenheit }) {
      return isFarenheit
    },
    isDarkMode({ isDarkMode }) {
      return isDarkMode
    },
    message({ message }) {
      return message
    },
  },
  mutations: {
    setTemperatureUnit(state, isFarenheit) {
      state.isFarenheit = isFarenheit
    },
    setDarkMode(state, isDarkMode) {
      state.isDarkMode = isDarkMode
    },
    setMessage(state, message) {
      state.message = message
    },
  },
})
