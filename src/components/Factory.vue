<template>
  <div class="app">

    <h1>factory</h1>

    <h2>production line</h2>

    <p>{{ time/1000 }}</p>

    <span v-for="(robot,index) in productionLine.robots" :key = "index">

      [{{ index }}]
      {{ robot.activity }}
      {{ robot.busy }}
      {{ robot.stock.foo.length }}
      {{ robot.stock.bar.length }}
      {{ robot.stock.foobar.length }}
      {{ robot.stock.money }}
      /

    </span>


  </div>
</template>

<script>

    import ProductionLine from '../app/productionLine'

    export default {

        name: 'Factory',

        props: {

            robotsQuantity: Number

        },

        data() {
            return {
                time: 0,
                timer: setInterval( () => {

                    this.time += 100
                    this.productionLine.render( this.time )

                }, 100 ),

                productionLine: new ProductionLine( this.robotsQuantity )

            }
        },

        mounted() {

            console.log('-- mounted --')

            //this.productionLine = new ProductionLine( this.robotsQuantity )

            // expose globally / console use

            window.pl = this.productionLine

        },

        beforeDestroy () {

            clearInterval( this.timer )

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
