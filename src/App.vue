<template>
  <div id="app">

    <Factory :robotsQuantity="2" />

  </div>
</template>

<script>
import Factory from './components/Factory.vue'



export default {
  name: 'App',
  components: {
      Factory
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
