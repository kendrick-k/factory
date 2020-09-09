<template>

  <div class="app">

    <div class="container">

        <div class="notification">

            <h1 class="factory__title">factory</h1>

            <p class="factory__timer">{{ time/1000 }}</p>

        </div>

        <div class="columns">
          <div class="column">

          </div>
        </div>

        <div class="columns">
            <div class="column">

            </div>
            <div class="column">
                <i class="fa fa-dolly"></i>
            </div>
            <div class="column">
                <i class="fa fa-stopwatch"></i>
            </div>
            <div class="column">
                <i class="fa fa-male"></i>

            </div>
            <div class="column">
                <i class="fa fa-female"></i>

            </div>
            <div class="column">
                <i class="fa fa-people-arrows"></i>

            </div>
            <div class="column">
                <i class="fa fa-euro-sign"></i>
            </div>
        </div>

        <div class="factory-robot" v-for="(robot,index) in productionLine.robots" :key = "index">

            <div class="columns">
                <div class="column">
                    <i class="fa fa-robot"></i> [{{ index }}]
                </div>
                <div class="column">
                    {{ robot.activity }}
                </div>
                <div class="column">
                    {{ robot.busy }}
                </div>
                <div class="column">
                    {{ robot.stock.foo.length }}
                </div>
                <div class="column">
                    {{ robot.stock.bar.length }}
                </div>
                <div class="column">
                    {{ robot.stock.foobar.length }}
                </div>
                <div class="column">
                    {{ robot.stock.money }}
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <ul>
                        <li class="factory-robot__foobar" v-for="(foobar,index) in robot.stock.foobar" :key = "index">
                        {{ foobar }}
                        </li>
                    </ul>
                </div>
            </div>

        </div>

      </div>

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

            this.message('factory opening')

            //this.productionLine = new ProductionLine( this.robotsQuantity )

            // expose globally / console use

            window.pl = this.productionLine

        },

        beforeDestroy () {

            clearInterval( this.timer )

        },

        methods: {

            message( message ) {

                this.$buefy.snackbar.open({
                    message: message,
                    type: 'is-warning',
                    position: 'is-bottom',
                    actionText: null,
                    indefinite: false,
                    onAction: () => {
                        this.$buefy.toast.open({
                            message: message,
                            queue: false
                        })
                    }
                })

            }

        },



    }

</script>

<style  lang="scss">

h1 {

}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.factory {

    &__title {
        margin: 3vw;
        font-size: 3rem;
    }

    &__title,&__timer {
         animation: fadeIn ease 20s;
         -webkit-animation: fadeIn ease 20s;
         -moz-animation: fadeIn ease 20s;
         -o-animation: fadeIn ease 20s;
         -ms-animation: fadeIn ease 20s;
    }

    &-robot {

        border-bottom: 1px #efeeee solid;
        margin-bottom: 25px;

        &__foobar {
            display: inline-block;
            margin: 0 10px;
            font-size: .8rem;
            color:#777;
        }

    }

}

@keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
}

@-moz-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
}

@-o-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
}

@-ms-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
}

    .snackbar .text {
        text-transform: uppercase !important;
    }

</style>
