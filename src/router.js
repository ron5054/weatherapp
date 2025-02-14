import { createRouter, createWebHashHistory } from 'vue-router'
import Favorites from './views/Favorites.vue'
import CityDetails from './views/CityDetails.vue'

const routes = [
  { path: '/', component: CityDetails },
  { path: '/:locationKey/:city/:country', component: CityDetails },
  { path: '/favorites', component: Favorites },
]

const router = createRouter({
  history: createWebHashHistory('weatherapp'),
  routes,
})

export default router
