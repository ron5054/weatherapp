<template>
  <section class="city-list">
    <CityPreview v-for="city in cities" :key="city.Key" :city="city" />
  </section>
</template>

<script>
import CityPreview from './CityPreview.vue'
export default {
  name: 'CityList',
  props: {
    cities: Array,
    required: true,
  },
  components: {
    CityPreview,
  },
  created() {
    console.log(this.cities)
  },
}
</script>
