import { createRouter, createWebHistory } from 'vue-router'
import Home from './viste/Home.vue'
import Selettore from './viste/Selettore.vue'
import Catalogo from './viste/Catalogo.vue'
import Dettaglio from './viste/Dettaglio.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/selettore', name: 'Selettore', component: Selettore },
  { path: '/algoritmi', name: 'Catalogo', component: Catalogo },
  { path: '/algoritmo/:id', name: 'Dettaglio', component: Dettaglio },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
