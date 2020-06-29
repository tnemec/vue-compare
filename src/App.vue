<template>
  <div id="app">
    <Header />
    <div class="views-panel panel">
      <div class="title">Views </div>
      <button class="btn" @click="switchView('Home')">Edit</button>
      <button class="btn" @click="switchView('BOM')">BOM</button>
    </div>
    <component v-bind:is="currentView" ></component>
    
  </div>
</template>

<script>
import Home from './views/Home.vue'
import BOM from './views/BOM.vue'
import Header from './components/Header'
import './views/ui.css'


export default {
  name: 'App',
  components: {
    Home,
    BOM,
    Header,
  },
  data() {
    return {
      currentView: "Home",
    }
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
  },
  methods : {
    switchView(view) {
      this.currentView = view;
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;

  color: #333;
}

  .views-panel {
    margin-left: 24px;
    margin-top: 4px;
    max-width: 250px;
  }

</style>
