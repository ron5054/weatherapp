<template>
  <section class="favorite-list">
    <FavoritePreview
      v-for="favorite in favorites"
      :key="favorite.Key"
      :favorite="favorite"
    />
  </section>
</template>

<script>
import FavoritePreview from './FavoritePreview.vue'

export default {
  name: 'FavoriteList',
  props: {
    favorites: {
      type: Array,
      required: true,
    },
  },
  components: {
    FavoritePreview,
  },
}
</script>
