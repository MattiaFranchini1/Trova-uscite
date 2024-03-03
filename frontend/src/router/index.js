import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Home from '../views/HomeView.vue';
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
  ]
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const userProfile = store.state.userProfile;

  if (to.meta.requiresAuth && (!userProfile || !userProfile.userInfo)) {
    next('/login');
  } else if (!to.meta.requiresAuth && userProfile && userProfile.userInfo) {
    next('/');
  } else {
    next();
  }
});

export default router;
