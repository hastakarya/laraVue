/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// Import Gate
import Gate from "./gate";
Vue.prototype.$gate = new Gate(window.user);
// Custom date display
import moment from 'moment';
// Custome moment timezone
import moment_timezone from 'moment-timezone';
// Axios VForm
import { Form, HasError, AlertError } from 'vform';
// Vue progress bar
import VueProgressBar from 'vue-progressbar';
// Sweet alert 2
import Swal from 'sweetalert2'
window.Swal = Swal;
// Sweet alert 2 global constant
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

window.Toast = Toast;

window.Fire = new Vue();

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
  { path: '/dashboard', component: require('./components/Dashboard.vue').default },
  { path: '/developer', component: require('./components/Developer.vue').default },
  { path: '/users', component: require('./components/Users.vue').default },
  { path: '/profile', component: require('./components/Profile.vue').default },
  { path: '*', component: require('./components/notFoundPage.vue').default }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
})

// First letter uppercase global function
Vue.filter('upText', function (text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
});

// Custom date display
Vue.filter('myDate', function (date) {
  return moment(date).tz('Asia/Jakarta').format('MMMM D YYYY, h:mm:ss a');
});

// Vue progress bar
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '3px'
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

// Laravel Vue Pagination
Vue.component('pagination', require('laravel-vue-pagination'));

// Laravel Passport Components
Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);

// Custom 404 Commponent
Vue.component(
  'not-found',
  require('./components/notFoundPage.vue').default
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
  el: '#app',
  router,
  data: {
    search: ''
  },
  methods: {
    searchit: _.debounce(() => {
      Fire.$emit('searching');
    }, 500)
  }
});
