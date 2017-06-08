import Vue from 'vue';
import Router from 'vue-router';
import Details from '@/components/Details';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

console.log(Details);

export default new Router({
  routes: [
    {
      path: '/',
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
