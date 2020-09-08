<template>
  <div class="app">

    <h1>factory</h1>

    <h2>production line</h2>

  </div>
</template>

<script>

  import ProductionLine from '../app/productionLine'

    export default {
      name: 'Factory',
      props: {
          robotsQuantity: Number
      },
      mounted() {

          console.log('-- mounted --')

          this.productionLine = new ProductionLine( this.robotsQuantity )

      }
    }

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
