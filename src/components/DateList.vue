<template>
  <section class="date-list">
    <DatePreview v-for="(date, idx) in dates" :key="idx" :date="date" />
  </section>
</template>

<script>
import DatePreview from './DatePreview.vue'
export default {
  components: {
    DatePreview,
  },
  props: {
    dates: Array,
    required: true,
  },
}
</script>
