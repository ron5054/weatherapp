<template>
  <section
    class="city-details"
    :style="{ backgroundColor: isDarkMode ? '#6d6363' : 'aliceblue' }"
  >
    <section class="search-bar">
      <input
        type="text"
        placeholder="Enter city"
        v-model="searchTerm"
        ref="searchInput"
      />
      <button @click="searchCity" :disabled="!searchTerm">Search</button>
    </section>

    <section class="city-list-container" v-if="cities">
      <button @click="this.cities = null">❌</button>
      <CityList :cities="cities" />
    </section>

    <section class="city" v-if="city && dates?.length">
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
      <DateList v-if="dates?.length" :dates="dates" />
    </section>
  </section>
  <Message-Modal :message="message" v-if="message" />
</template>

<script>
import { weatherService } from '../services/weather.service'
import DateList from '../components/DateList.vue'
import CityList from '../components/CityList.vue'
import MessageModal from '../components/MessageModal.vue'

export default {
  name: 'CityDetails',
  components: {
    DateList,
    CityList,
    MessageModal,
  },
  data() {
    return {
      dates: [],
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      searchTerm: '',
      cities: null,
      message: null,
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
    isFavorite() {
      return this.favorites.some(
        (favorite) => favorite.locationKey === this.locationKey
      )
    },
    isDarkMode() {
      return this.$store.getters.isDarkMode
    },
  },
  async created() {
    if (!this.locationKey) await this.goToUserLocation()
    await this.loadWeather()
  },
  mounted() {
    this.$refs.searchInput.focus()
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    handleKeydown({ key }) {
      if (key === 'Escape') this.cities = null
      if (key === 'Enter') this.searchCity()
    },
    async goToUserLocation() {
      const userLocation = await weatherService.getUserLocation()
      const lat = userLocation.coords.latitude
      const lon = userLocation.coords.longitude

      if (lat && lon) {
        const { locationKey, city, country } =
          await weatherService.getLocationData(lat, lon)
        this.$router.push(`/${locationKey}/${city}/${country}`)
      }
    },
    async loadWeather() {
      if (!this.locationKey) return
      try {
        this.dates = await weatherService.getWeatherForcast(this.locationKey)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        this.$store.commit(
          'setMessage',
          { text: 'Error fetching weather data' },
          'error'
        )
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
        this.$store.commit(
          'setMessage',
          { text: 'Error fetching weather data' },
          'error'
        )
      }
    },
  },
  watch: {
    locationKey() {
      if (!this.locationKey) this.goToUserLocation()
      this.loadWeather()
    },
    searchTerm(newVal) {
      if (!/^[\x00-\x7F]*$/.test(newVal)) {
        this.$store.commit('setMessage', {
          text: 'please type in english only',
          type: 'error',
        })
        this.searchTerm = ''
      }
    },
  },
}
</script>
