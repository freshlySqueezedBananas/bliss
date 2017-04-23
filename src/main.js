import Vue from 'vue'
import * as App from './index.vue';

require('./bootstrap.js');

new Vue(App).$mount('#app');
