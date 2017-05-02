/* ============
 * Vue
 * ============
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';

Vue.config.debug = process.env.NODE_ENV !== 'production';

const bus = new Vue();

// Bind the event bus to Vue.
Vue.$bus = bus;
Object.defineProperty(Vue.prototype, '$bus', {
  get() {
    return bus;
  },
});

/* ============
 * Axios
 * ============
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios';

Axios.defaults.baseURL = "";
Axios.defaults.headers.common.Accept = 'application/json';
Vue.$http = Axios;

/* ============
 * Vuex Router Sync
 * ============
 * http://router.vuejs.org/en/index.html
 */
import VuexRouterSync from 'vuex-router-sync';
import store from './app/store';

import VueRouter from 'vue-router';
import routes from './app/routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  ...routes
});

VuexRouterSync.sync(store, router);

Vue.router = router;

/* ============
 * jQuery
 * ============
 * http://jquery.com/
 */
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

/* ============
 * Tween.js
 * ============
 * https://github.com/tweenjs/tween.js/
 */
window.TWEEN = require('tween.js');

/* ============
 * Bootstrap
 * ============
 * http://getbootstrap.com/
 */
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');

/* ============
 * Font Awesome
 * ============
 * http://fontawesome.io/
 */
require('font-awesome/css/font-awesome.min.css');


/* ============
 * App styles
 * ============
 */
require('./assets/sass/app.scss');


export default {
  router,
};
