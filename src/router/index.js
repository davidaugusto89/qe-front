import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: "/cadastros",
    name: 'home',
    //component: () => import('../views/HomeView.vue')

  },
  {
    path: '/cadastros',
    name: 'cadastros.lista',
    component: () => import('../views/Cadastro/ListaView.vue')
  },
  {
    path: '/cadastros/inserir',
    name: 'cadastros.inserir',
    component: () => import('../views/Cadastro/FormularioView.vue')
  },
  {
    path: '/cadastros/editar/:id',
    name: 'cadastros.editar',
    component: () => import('../views/Cadastro/FormularioView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
