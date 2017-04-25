<template>
  <div id="app">
    <loading-screen v-if="showLoading" :health="health" :dead="dead" :conn="conn" :refreshing="refreshing" @refresh="onRefresh"></loading-screen>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import store from './store'
  import router from './router'
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
        this.resetTrials();
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
  }
</script>