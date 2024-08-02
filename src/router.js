import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import Favorites from './views/Favorites.vue'
import CityDetails from './views/CityDetails.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/:locationKey/:city/:country', component: CityDetails },
  { path: '/favorites', component: Favorites },
]

const router = createRouter({
  history: createWebHistory('/weatherapp/'),
  routes,
})

export default router
