<template>
  <section class="favorite-preview" @click="goToWeather">
    <h2>{{ favorite.city }}, {{ favorite.country }}</h2>
    <h3>{{ favorite.weatherData[0].WeatherText }}</h3>
    <h2>{{ temperature }}°{{ unit }}</h2>
  </section>
</template>

<script>
export default {
  name: 'FavoritePreview',
  props: {
    favorite: {
      type: Object,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  computed: {
    temperature() {
      const temp = this.favorite.weatherData[0].Temperature.Metric.Value
      if (this.unit.toLowerCase() === 'c') {
        return temp.toFixed(0)
      } else {
        const fahrenheit = (temp * 9) / 5 + 32
        return fahrenheit.toFixed(0)
      }
    },
  },
  methods: {
    goToWeather() {
      this.$router.push(
        `/${this.favorite.locationKey}/${this.favorite.city}/${this.favorite.country}`
      )
    },
  },
}
</script>
