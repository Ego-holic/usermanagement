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
      path: '/users',
      name: 'usersForm',
      component: () => import('@/views/users/UserForm.vue'),
      props: true,
    },
    {
      path: '/useredit/:id',
      name: 'useredit',
      component: () => import('@/views/users/UserInfoEdit.vue'),
    },
  ],
});
