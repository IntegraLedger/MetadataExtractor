<template>
  <div id="app">
    <div class="loading" v-if="loading">
      <b-spinner variant="success" class="spinner" label="Loading..." type="grow"></b-spinner>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState({
    loading: state => state.document.loading
  }),
}
</script>
<style lang="scss">
@import "./assets/styles/index.scss";

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
