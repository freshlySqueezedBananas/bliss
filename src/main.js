// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Axios from 'axios';
import loadingScreen from './components/loading/loading.vue';

//Axios.defaults.baseURL = process.env.API_LOCATION;
//Axios.defaults.headers.common.Accept = 'application/json';
Vue.$http = Axios;

import $ from "jquery";
window.$ = window.jQuery = $;

require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
require('./assets/sass/app.scss');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<div id="app"><loading-screen v-if="showLoading" :health="health" :dead="dead" :conn="conn" :refreshing="refreshing" @refresh="onRefresh"></loading-screen><router-view></router-view></div>',
  data: function() {
    return {
      health: null,
      dead: false,
      conn: true,
      refreshing: false,
      showLoading: true,
    }
  },
  created: function() {
    $('body').addClass('halt');
    this.checkHealth();
  },
  methods: {
    checkHealth: function() {
      Vue.$http.get("https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health").then(response => {
        if (response.data.status == 'OK') {
          this.pronounceAlive();
        }
        else {
          this.pronounceDead();
        }
      }).catch(error => {
          this.pronounceDead();

      });
    },
    monitorConnection: function() {
      let context = this;
      this.checkInterval = setInterval(function() {
        context.checkConnection();
      }, 3000);
    },
    checkConnection: function() {
      Vue.$http.get("/").then(response => {
        this.conn = true;
      }).catch(error => {
        this.conn = false;
      });
    },
    pronounceAlive: function() {
      this.health = true;
      this.monitorConnection();
      this.showLoading = false;
    },
    pronounceDead: function() {
      this.health = false;
      this.dead = true;
      this.showLoading = true;

    },
    resetTrials: function() {
      clearInterval(this.checkInterval);

      let context = this;
      setTimeout(function() {
        context.refreshing = false;
      }, 1500);
    },
    onRefresh: function() {
      this.refreshing = true;
      this.checkHealth();
    }
  },
  watch: {
    showLoading: function() {
      if (this.showLoading) {
        $('body').addClass('halt');
      }
      else {
        $('body').removeClass('halt');
      }
    },
    conn: function() {
      if (!this.conn) {
        this.pronounceDead();
      }
      else {
        this.pronounceAlive();
      }
    }
  },
  components: { loadingScreen },
})