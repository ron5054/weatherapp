<template>
  <section class="favorite-preview" @click="goToWeather">
    <h2>{{ favorite.city }}, {{ favorite.country }}</h2>
    <h3>{{ favorite.weatherData[0].WeatherText }}</h3>
    <img :src="weatherIcon" alt="" />
    <h2>{{ temperature }}°{{ isFarenheit ? 'F' : 'C' }}</h2>
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
  },
  computed: {
    temperature() {
      const temp = this.favorite.weatherData[0].Temperature.Metric.Value
      if (!this.isFarenheit) {
        return temp.toFixed(0)
      } else {
        const fahrenheit = (temp * 9) / 5 + 32
        return fahrenheit.toFixed(0)
      }
    },
    isFarenheit() {
      return this.$store.getters.isFarenheit
    },
    weatherIcon() {
      const weatherText = this.favorite.weatherData[0].WeatherText.toLowerCase()
      if (weatherText.includes('clear') || weatherText.includes('sunny'))
        return '/weatherapp/day.svg'
      if (weatherText.includes('cloudy')) return '/weatherapp/cloudy.svg'
      if (weatherText.includes('rain')) return '/weatherapp/rainy-1.svg'
      if (weatherText.includes('snow')) return '/weatherapp/snowy-1.svg'
      if (weatherText.includes('thunder')) return '/weatherapp/thunder.svg'
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
