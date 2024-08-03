<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/Favorites">Favorites</RouterLink>
    </nav>
    <section class="toggles">
      <div class="temperature-toggle">
        <span>°C</span>
        <label class="switch">
          <input
            type="checkbox"
            v-model="isFahrenheit"
            @change="toggleTemperature"
          />
          <span class="slider round"></span>
        </label>
        <span>°F</span>
      </div>
      <div class="temperature-toggle dark-mode-toggle">
        <span>💡</span>
        <label class="switch">
          <input
            type="checkbox"
            v-model="isDarkMode"
            @change="toggleDarkMode"
          />
          <span class="slider round"></span>
        </label>
        <span>🌙</span>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isFahrenheit: null,
      isDarkMode: true,
    }
  },
  created() {
    this.setUserTemperatureUnit()
    this.setUserDarkMode()
  },
  methods: {
    setUserTemperatureUnit() {
      const temperatureUnit = localStorage.getItem('temperatureUnit')
      this.isFahrenheit = temperatureUnit === 'f'
      this.$store.commit('setTemperatureUnit', this.isFahrenheit)
    },
    setUserDarkMode() {
      const isDarkMode = localStorage.getItem('isDarkMode')
      if (isDarkMode) this.isDarkMode = isDarkMode === 'true'
      this.$store.commit('setDarkMode', this.isDarkMode)
    },
    toggleTemperature() {
      this.$store.commit('setTemperatureUnit', this.isFahrenheit)
      localStorage.setItem('temperatureUnit', this.isFahrenheit ? 'f' : 'c')
    },
    toggleDarkMode() {
      this.$store.commit('setDarkMode', this.isDarkMode)
      localStorage.setItem('isDarkMode', this.isDarkMode ? true : false)
    },
  },
}
</script>
