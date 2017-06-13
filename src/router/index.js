import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Details from '@/components/Details';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

// console.log(Details);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});
