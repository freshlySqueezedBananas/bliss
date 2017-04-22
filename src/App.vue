<template>
  <div id="app">
    <loading-screen v-if='showLoading' :health='health' :dead='dead' :conn='conn' :refreshing='refreshing' @refresh="onRefresh"></loading-screen>
  <router-view></router-view>
  </div>
</template>

<script src="./app.js" lang="babel"></script>