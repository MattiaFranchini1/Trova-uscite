import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Aule from '../views/AuleView.vue'
import Home from '../views/HomeView.vue';
import AuleDetails from '../views/AuleDetailsView.vue'
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
      //meta: { requiresAuth: true },
    },
    {
      path: '/aule',
      name: 'Aule',
      component: Aule,
      //meta: { requiresAuth: true },
    },
    {
      path: '/aule-details/:identificatore',
      name: 'AuleDetails',
      component: AuleDetails,
      //meta: { requiresAuth: true },
    },
  ]
});

/*router.beforeEach((to, from, next) => {
  const store = useStore();
  const userProfile = store.state.userProfile;

  if (to.meta.requiresAuth && (!userProfile || !userProfile.userInfo)) {
    next('/login');
  } else if (!to.meta.requiresAuth && userProfile && userProfile.userInfo) {
    next('/');
  } else {
    next();
  }
});*/

export default router;
