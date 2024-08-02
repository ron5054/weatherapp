<template>
  <div class="date-preview">
    <h1>{{ dayName }}</h1>
    <p>{{ date.Day.IconPhrase }}</p>
    <p>{{ minTemp }}° - {{ maxTemp }}°{{ unit }}</p>
  </div>
</template>

<script>
export default {
  name: 'DatePreview',
  props: {
    date: {
      type: Object,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  computed: {
    dayName() {
      const date = new Date(this.date.Date)
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      return days[date.getUTCDay()]
    },
    minTemp() {
      const temp = this.date.Temperature.Minimum.Value
      if (this.unit.toLowerCase() === 'c') {
        return temp.toFixed(0)
      } else {
        const fahrenheit = (temp * 9) / 5 + 32
        return fahrenheit.toFixed(0)
      }
    },
    maxTemp() {
      if (this.unit.toLowerCase() === 'c') {
        return this.date.Temperature.Maximum.Value.toFixed(1)
      } else {
        const fahrenheitTemp =
          (this.date.Temperature.Maximum.Value * 9) / 5 + 32
        return fahrenheitTemp.toFixed(0)
      }
    },
  },
}
</script>
