<template>
  <div class="weather-index">
    <Header @temperatureUnitChanged="this.unit = $event" />
    <RouterView :unit="unit" />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import HomePage from './HomePage.vue'
import Footer from '../components/Footer.vue'

import { weatherService } from '../services/weather.service'

export default {
  name: 'WeatherIndex',

  data() {
    return {
      unit: 'C',
    }
  },
  components: {
    Header,
    HomePage,
    Footer,
  },
}
</script>
