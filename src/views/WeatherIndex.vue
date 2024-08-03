<template>
  <div
    class="weather-index"
    :style="{ backgroundColor: isDarkMode ? '#6d6363' : 'aliceblue' }"
  >
    <Header />
    <RouterView />
    <Footer />
    <MessageModal />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import MessageModal from '../components/MessageModal.vue'

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
    MessageModal,
  },
}
</script>
