<template>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/Favorites">Favorites</RouterLink>
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
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isFahrenheit: null,
    }
  },
  created() {
    const temperatureUnit = localStorage.getItem('temperatureUnit')
    if (temperatureUnit) {
      this.isFahrenheit = temperatureUnit === 'f'
      this.$store.commit('setTemperatureUnit', temperatureUnit === 'f')
    }
  },
  methods: {
    toggleTemperature() {
      this.$store.commit('setTemperatureUnit', this.isFahrenheit)
      const currentValue = this.isFahrenheit ? 'f' : 'c'
      localStorage.setItem('temperatureUnit', currentValue)
    },
  },
}
</script>
