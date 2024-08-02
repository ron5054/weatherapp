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
      isFahrenheit: false,
    }
  },
  created() {
    const temperatureUnit = localStorage.getItem('temperatureUnit')
    if (temperatureUnit) {
      this.isFahrenheit = temperatureUnit === 'f'
    }
  },
  methods: {
    toggleTemperature() {
      const currentValue = this.isFahrenheit ? 'f' : 'c'
      localStorage.setItem('temperatureUnit', currentValue)
      this.$emit('temperatureUnitChanged', currentValue)
    },
  },
}
</script>
