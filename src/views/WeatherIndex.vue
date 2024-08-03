<template>
  <div class="weather-index">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'WeatherIndex',

  components: {
    Header,
    Footer,
  },
}
</script>
