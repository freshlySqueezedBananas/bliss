<template>
  <div id="app">
    <loading-screen v-if="showLoading" :health="health" :dead="dead" :conn="conn" :refreshing="refreshing" @refresh="onRefresh"></loading-screen>
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
        health: null,
        dead: false,
        conn: true,
        refreshing: false,
        showLoading: true,
      }
    },
    created: function() {
      $('body').addClass('halt');
      Service.health.check();
    },
    computed: mapGetters({
      api: 'getApi',
      server: 'getServer'
    }),
    methods: {
      monitorConnection: function() {
        let context = this;
        this.checkInterval = setInterval(function() {
          Service.connection.check();
        }, 3000);
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
        this.resetTrials();
        this.checkHealth();
      }
    },
    watch: {
      api: function() {
        this.api ?
          this.pronounceAlive() : this.pronounceDead();
      },
      server: function() {
        this.server ?
          this.conn = true : this.conn = false;
      },
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