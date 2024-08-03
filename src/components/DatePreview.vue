<template>
  <div class="date-preview">
    <h1>{{ dayName }}</h1>
    <img :src="weatherIcon" alt="" />
    <p>{{ date.Day.IconPhrase }}</p>
    <p>{{ minTemp }}° - {{ maxTemp }}°{{ isFarenheit ? 'F' : 'C' }}</p>
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
    isFarenheit() {
      return this.$store.getters.isFarenheit
    },
    minTemp() {
      const temp = this.date.Temperature.Minimum.Value
      if (!this.isFarenheit) {
        return temp.toFixed(0)
      } else {
        const fahrenheit = (temp * 9) / 5 + 32
        return fahrenheit.toFixed(0)
      }
    },
    maxTemp() {
      if (!this.isFarenheit) {
        return this.date.Temperature.Maximum.Value.toFixed(0)
      } else {
        const fahrenheitTemp =
          (this.date.Temperature.Maximum.Value * 9) / 5 + 32
        return fahrenheitTemp.toFixed(0)
      }
    },
    weatherIcon() {
      const weatherText = this.date.Day.IconPhrase.toLowerCase()
      if (weatherText.includes('mostly sunny'))
        return '/weatherapp/cloudy-day-2.svg'
      if (weatherText.includes('clear') || weatherText.includes('sunny'))
        return '/weatherapp/day.svg'
      if (weatherText.includes('storms') || weatherText.includes('thunder'))
        return '/weatherapp/thunder.svg'
      if (weatherText.includes('cloudy')) return '/weatherapp/cloudy.svg'
      if (weatherText.includes('rain')) return '/weatherapp/rainy-1.svg'
      if (weatherText.includes('snow')) return '/weatherapp/snowy-1.svg'
    },
  },
}
</script>
