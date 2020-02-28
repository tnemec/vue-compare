<template>
  <div id="app">
    <Home />
    
  </div>
</template>

<script>
import Home from './views/Home.vue'


export default {
  name: 'App',
  components: {Home},
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  created() {
    // Subscribe to store updates
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string
      window.localStorage.setItem('store', JSON.stringify(state));
    });
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;

  color: #333;
}

</style>
