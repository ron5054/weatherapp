<template>
  <div
    class="weather-index"
    :style="{ backgroundColor: isDarkMode ? '#6d6363' : '#fff' }"
  >
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

  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode
    },
  },

  components: {
    Header,
    Footer,
  },
}
</script>
