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
    throw error
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
    throw error
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
  try {
    const forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`
    const res = await fetch(forecastUrl)
    if (!res.ok) throw new Error('Failed to fetch weather forecast')
    const weather = await res.json()
    return weather
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

async function getWeatherForcast(locationKey) {
  const cachedWeather = _getWeatherFromCache(locationKey)

  if (cachedWeather) {
    const isStale = Date.now() - cachedWeather.timestamp > 3600000 // 1 hour
    if (cachedWeather && !isStale) return cachedWeather.DailyForecasts
  }

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
    throw error
  }
}

async function getCurrWeather(locationKey) {
  try {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en&details=true`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch current weather')

    const weather = await res.json()
    return weather
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

async function getUserLocation() {
  try {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  } catch (error) {
    console.error('Error getting user location:', error)
    throw error
  }
}
