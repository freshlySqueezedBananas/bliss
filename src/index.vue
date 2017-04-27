<template>
  <div id="app">
    <loading-screen v-if="showLoading" :api="api" :dead="dead" :server="server" :refreshing="refreshing" @refresh="onRefresh"></loading-screen>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex';

  import store from './store'
  import Service from './services'
  import { router } from './bootstrap'

  import loadingScreen from './components/loading/loading.vue';

  export default {
    router,
    store,
    data: function() {
      return {
        refreshing: false,
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
      showLoading: function() {
        this.showLoading = true;
      },
      hideLoading: function() {
        this.showLoading = false;
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
        this.resetTrials();
        this.checkHealth();
      }
    },
    watch: {
      api: function() {
        this.api ?
          this.hideLoading() : false;
      },
      /*api: function() {
        this.api ?
          this.pronounceAlive() : this.pronounceDead();
      },
      server: function() {
        this.server ?
          this.conn = true : this.conn = false;
      },*/
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
  }
</script>