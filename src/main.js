import Vue from 'vue'
import * as App from './app/index.vue';

require('./bootstrap.js');

new Vue(App).$mount('#app');
