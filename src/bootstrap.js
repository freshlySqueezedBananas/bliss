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
 * jQuery
 * ============
 * http://jquery.com/
 */
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;


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
