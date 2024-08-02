export const weatherService = {
  getWeatherForcast,
  getUserLocation,
  getLocationData,
  searchCity,
  getCurrWeather,
}

const API_KEY = import.meta.env.VITE_API_KEY

async function searchCity(searchTerm) {
  try {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch location key')

    const cities = await res.json()
    return cities
  } catch (error) {
    console.error('Error fetching location key:', error)
  }
}

async function getLocationData(lat, lon) {
  try {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch location key')

    const location = await res.json()

    return {
      locationKey: location.Key,
      city: location.EnglishName,
      country: location.Country.EnglishName,
    }
  } catch (error) {
    console.error('Error fetching location key:', error)
    return null
  }
}

function _getWeatherFromCache(locationKey) {
  const weatherData = JSON.parse(localStorage.getItem('weather')) || []
  return (
    weatherData.find((weather) => weather.locationKey === locationKey) || null
  )
}

function _saveWeatherToCache(locationWeather) {
  const weatherData = JSON.parse(localStorage.getItem('weather')) || []
  localStorage.setItem(
    'weather',
    JSON.stringify([...weatherData, locationWeather])
  )
}

async function fetchWeatherFromApi(locationKey) {
  const forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`
  const res = await fetch(forecastUrl)
  if (!res.ok) throw new Error('Failed to fetch weather forecast')
  return res.json()
}

async function getWeatherForcast(locationKey) {
  const cachedWeather = _getWeatherFromCache(locationKey)
  if (cachedWeather) return cachedWeather.DailyForecasts

  console.log('Fetching new weather data from API for:', locationKey)
  try {
    const { DailyForecasts } = await fetchWeatherFromApi(locationKey)

    const locationWeather = {
      timestamp: Date.now(),
      locationKey,
      DailyForecasts,
    }

    _saveWeatherToCache(locationWeather)
    return DailyForecasts
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}

async function getCurrWeather(locationKey) {
  const url = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en&details=true`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch current weather')

  const weather = await res.json()
  return weather
}

async function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
