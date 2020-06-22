<template>
  <div id="app">
    <Header />
    <Home />
    
  </div>
</template>

<script>
import Home from './views/Home.vue'
import Header from './components/Header'
import './views/ui.css'


export default {
  name: 'App',
  components: {
    Home,
    Header,
  },
  beforeCreate() {
    this.$store.commit('initialiseStore'); // load state from localStorage
  },
  created() {
    // Subscribe to store updates
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string
      window.localStorage.setItem(this.$store.getters.getLocalStorageKey, JSON.stringify(state));
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
