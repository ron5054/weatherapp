<template>
  <main>
    <!-- <section class="search-bar">
      <input type="text" placeholder="Enter city" />
      <button>Search</button>
    </section> -->
  </main>
</template>

<script>
import { weatherService } from '../services/weather.service'
export default {
  name: 'HomePage',
  data() {
    return {
      city: null,
      country: null,
      weather: null,
    }
  },

  async created() {
    const userLocation = await weatherService.getUserLocation()
    const lat = userLocation.coords.latitude
    const lon = userLocation.coords.longitude

    if (lat && lon) {
      const { locationKey, city, country } =
        await weatherService.getLocationData(lat, lon)
      this.$router.push(`/${locationKey}/${city}/${country}`)
    }
  },
}
</script>
