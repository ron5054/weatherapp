<template>
  <section class="city-details">
    <section class="search-bar">
      <input type="text" placeholder="Enter city" v-model="searchTerm" />
      <button @click="searchCity">Search</button>
    </section>

    <section class="city-list-container" v-if="cities">
      <button @click="this.cities = null">X</button>
      <CityList :cities="cities" />
    </section>

    <section class="city" v-show="!cities">
      <div class="city-header">
        <h1 v-if="city">{{ city }}, {{ country }}</h1>
        <img
          v-if="isFavorite"
          src="/heart-flat-icon.svg"
          alt="Remove from favorites"
          @click="toggleFavorites(locationKey, city, country)"
        />
        <img
          v-else
          src="/heart-outline-icon.svg"
          alt="Add to favorites"
          @click="toggleFavorites(locationKey, city, country)"
        />
      </div>
      <DateList v-if="dates.length" :dates="dates" :unit="unit" />
    </section>
  </section>
</template>

<script>
import { weatherService } from '../services/weather.service'
import DateList from '../components/DateList.vue'
import CityList from '../components/CityList.vue'

export default {
  name: 'CityDetails',
  components: {
    DateList,
    CityList,
  },
  props: {
    unit: String,
  },
  data() {
    return {
      dates: [],
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      searchTerm: '',
      cities: null,
    }
  },
  computed: {
    locationKey() {
      return this.$route.params.locationKey
    },
    city() {
      return this.$route.params.city
    },
    country() {
      return this.$route.params.country
    },
    buttonColor() {
      return this.isFavorite ? 'red' : 'green'
    },
    isFavorite() {
      return this.favorites.some(
        (favorite) => favorite.locationKey === this.locationKey
      )
    },
  },
  async created() {
    await this.loadWeather()
  },
  methods: {
    async loadWeather() {
      try {
        this.dates = await weatherService.getWeatherForcast(this.locationKey)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
    toggleFavorites(locationKey, city, country) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      const existingFavoriteIndex = favorites.findIndex(
        (favorite) => favorite.locationKey === locationKey
      )

      if (existingFavoriteIndex !== -1)
        favorites.splice(existingFavoriteIndex, 1)
      else favorites.push({ locationKey, city, country })

      localStorage.setItem('favorites', JSON.stringify(favorites))
      this.favorites = favorites
    },
    async searchCity() {
      if (!this.searchTerm) return
      try {
        this.cities = await weatherService.searchCity(this.searchTerm)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
  },
  watch: {
    locationKey() {
      this.loadWeather()
    },
  },
}
</script>
