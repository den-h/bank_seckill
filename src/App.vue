<template>
  <div id="nav">
    <router-view></router-view>
  </div>
</template>

<script>
import Register from './views/Register.vue';
export default {
  name:"App",
  components: {
    Register
  },
  methods: {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
