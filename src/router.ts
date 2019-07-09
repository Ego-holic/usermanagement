import Vue from 'vue';
import Router from 'vue-router';
import Applications from './views/applications/Applications.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'applications',
      },
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications,
    },
    {
      path: '/applications/:id/roles',
      name: 'roles',
      component: () => import('@/views/roles/Roles.vue'),
      props: true,
    },
    {
      path: '/personal',
      name: 'personalusers',
      component: () => import('@/views/personalusers/Personalusers.vue'),
      props: true,
    },
    {
      path: '/change',
      name: 'changepassword',
      component: () => import('@/views/users/ChangePassword.vue'),
      props: true,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
