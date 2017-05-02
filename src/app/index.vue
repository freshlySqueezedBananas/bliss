<template>
  <div id="app">
    <loading-screen v-if="showLoading" :api="api" :server="server"></loading-screen>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex';

  import store from './store'
  import Service from './services'
  import { router } from '../bootstrap'

  import loadingScreen from './components/loading-screen/loading-screen.vue';

  export default {
    router,
    store,
    data: function() {
      return {
        showLoading: true,
      }
    },
    created: function() {
      $('body').addClass('halt');
      Service.health.check();
      Service.connection.monitor();
    },
    computed: mapGetters({
      api: 'getApi',
      server: 'getServer'
    }),
    methods: {
      showLoadingScreen: function() {
        this.showLoading = true;
        $('body').addClass('halt');
      },
      hideLoadingScreen: function() {
        this.showLoading = false;
        $('body').removeClass('halt');
      }
    },
    watch: {
      api: function() {
        this.api && this.hideLoadingScreen();
      },
      server: function() {
        !this.server && this.showLoadingScreen();
      }
    },
    components: { loadingScreen },
  }
</script>