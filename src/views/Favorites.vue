<template>
  <section class="favorites">
    <FavoviteList v-if="favorites" :favorites="favorites" :unit="unit" />
  </section>
</template>

<script>
import { weatherService } from '../services/weather.service'
import FavoviteList from '../components/FavoviteList.vue'

export default {
  name: 'Favorites',
  props: {
    unit: String,
  },
  data() {
    return {
      favorites: null,
    }
  },
  components: {
    FavoviteList,
  },
  async created() {
    this.getFavorites()
  },
  methods: {
    async getFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      const promises = favorites.map(({ locationKey }) =>
        weatherService.getCurrWeather(locationKey)
      )
      try {
        const results = await Promise.all(promises)
        const mergedData = favorites.map((favorite, idx) => ({
          ...favorite,
          weatherData: results[idx],
        }))

        this.favorites = mergedData
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
  },
}
</script>
