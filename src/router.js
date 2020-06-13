import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from './views/Game.vue'
import HighScores from './views/HighScores.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game
  },
  {
    path: '/high-scores',
    name: 'HighScores',
    component: HighScores
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
