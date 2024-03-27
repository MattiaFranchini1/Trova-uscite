import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Aule from '../views/AuleView.vue'
import Home from '../views/HomeView.vue';
import AuleDetails from '../views/AuleDetailsView.vue'
import PuntiDiRaccolta from '../views/PuntiRaccoltaView.vue'
import { useStore } from 'vuex';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/aule',
      name: 'Aule',
      component: Aule,
    },
    {
      path: '/aule-details/:identificatore',
      name: 'AuleDetails',
      component: AuleDetails,
    },
    {
      path: '/punti-raccolta',
      name: 'PuntiDiRaccolta',
      component: PuntiDiRaccolta,
    },
  ]
});

export default router;
