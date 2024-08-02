<template>
  <section class="city-preview" @click="goToWeather">
    <h1>{{ city.LocalizedName }}</h1>
    <span>{{ city.Country.LocalizedName }}</span>
  </section>
</template>

<script>
export default {
  name: 'CityPreview',
  props: {
    city: Object,
    required: true,
  },
  methods: {
    goToWeather() {
      this.$router.push(
        `/${this.city.Key}/${this.city.LocalizedName}/${this.city.Country.LocalizedName}`
      )
    },
  },
}
</script>
