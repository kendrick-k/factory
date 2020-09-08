'use strict'



import Stock from './stock'
import uid from 'uid'



class Robot {



    constructor( id ) {

        this.debug = true

        this.busy = false

        this.id = id

        this.timer = null

        this.stock = new Stock()

        this.activity = null

    }


    // eslint-disable-next-line no-unused-vars
    setBusy( seconds , callback ) {

        this.busy = seconds

        if (!this.timer) {

            this.timer = setTimeout( () => {

                    this.busy = false

                    this.log( 'busy > finished' )

                    this.timer = null

                    if (callback)
                        callback()

                },

                seconds * 1000,

                callback

            )

        }

        this.log( 'setBusy' , this.busy )

    }



    isBusy() {

        return this.busy

    }



    move() {

        this.setBusy( 5 , ()=>{} )   // 5 seconds Idle

    }



    stop() {

        this.setBusy( false , ()=>{} )

    }



    buildFoo() {

        if ( !this.isBusy() ) {

            this.setBusy( 1 ,
                () => { this.stock.foo.push( uid() ) }
            )

        } else {

            this.log( 'nop : busy' )

        }

        return this

    }



    buildBar() {

        if ( !this.isBusy() ) {

            this.setBusy( this.getRandom( 0.5 , 2 ) ,
                () => { this.stock.bar.push( uid() ) }
                )

        } else {

            this.log( 'nop : busy' )

        }

        return this

    }



    buildFooBar() {

        if ( !this.isBusy() ) {



        } else {

            this.log( 'nop : busy' )

        }

        return this

    }



    getRandom( min, max ) {

        min = Math.ceil(min * 10)
        max = Math.floor(max * 10)

        return Math.round( 100 * ( Math.random() * (max - min) + min ) / 10 ) / 100

    }



    log( m , d = null ) {

        if (this.debug)
            console.log( '> Robot(' + this.id + ') : ' + m , d )

    }



}



export default Robot