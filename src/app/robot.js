'use strict'



import Stock from './stock'
import uid from 'uid'



class Robot {



    constructor( id , productionLineRef ) {

        this.debug = true

        this.busy = null

        this.id = id

        this.productionLine = productionLineRef

        this.timer = null

        this.stock = new Stock()

        this.activity = null

        this.activityPrevious = null

        this.actionSell = this.actionFoobar = false

    }


    // eslint-disable-next-line no-unused-vars
    setBusy( seconds , callback ) {

        this.busy = seconds

        if (!this.timer) {

            this.timer = setTimeout( () => {

                    this.busy = null

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



    getActivityPrevious() {

        return this.activityPrevious

    }



    move( next ) {

        if ( !this.isBusy() ) {

            //this.activity = 'move'

            this.setBusy( 5 , next )   // 5 seconds Idle

        }

    }



    moveCheck( next ) {

        console.log(this.activity,this.activityPrevious)

        if (this.activity !== this.activityPrevious) {

            this.log('*** move ***')

            this.move( next )

        } else {
            this.log('>>> nomove ***')
            next()
        }

    }



    buildFoo() {

        if ( !this.isBusy() ) {

            this.activityPrevious = '' + this.activity
            this.activity = 'buildFoo'

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

            this.activityPrevious = '' + this.activity
            this.activity = 'buildBar'

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

            if ( this.stock.foo.length > 0 && this.stock.bar.length > 0 ) {

                this.setBusy( 2 ,

                    () => {

                        this.activityPrevious = '' + this.activity
                        this.activity = 'buildFooBar'

                        // take foo (may be lost)

                        // eslint-disable-next-line no-unused-vars
                        let foo = this.stock.foo.pop()

                        if (Math.random()*100 < 60) {

                            this.log('build pass')

                            let bar = this.stock.bar.pop()

                            this.stock.foobar.push( foo + '-' + bar )

                        } else {

                            // no build
                            this.log('no build')

                        }

                    }

                )

            } else {

                // no build
                this.log('no build ( not enough elements )')

            }

        } else {

            this.log( 'nop : busy' )

        }

        return this

    }



    sellFoobar() {

        if ( !this.isBusy() ) {

            this.setBusy( 1 ,
                () => {

                    this.activityPrevious = '' + this.activity
                    this.activity = 'sellFoobar'

                    let sell = this.stock.foobar.length

                    if ( sell > 5 ) sell = 5

                    let a = this.stock.foobar.length,
                        b = this.stock.foobar.length - sell

                    for (let i = a; i > b; i--) {

                        this.stock.foobar.splice( i - 1 , 1 )

                        this.stock.money++  // 1€

                    }

                }

            )

        } else {

            this.log( 'nop : busy' )

        }

        return this

    }



    buyRobot() {



    }



    render() {

        //this.log(this.activity)

        if ( !this.isBusy() ) {

            this.log(this.activity)

            if (this.stock.money >= 3 && this.stock.foo.length >= 6) {

                // buy robot

                this.log(' // buy robot // ')

                this.productionLine.robotAdd()

                this.stock.money = this.stock.money - 3

                this.stock.foo.splice(-6, 6)

            } else

            // sell batch / 10
            if (this.stock.foobar.length >= 3 || this.actionSell) {

                if (!this.actionSell)
                    this.moveCheck( this.sellFoobar.bind(this) )
                else
                    this.sellFoobar()

                this.actionSell = true

                if (this.stock.foobar.length==0)
                    this.actionSell = false

            } else

            if (this.stock.foo.length >= 6 && this.stock.bar.length >= 6 || this.actionFoobar) {

                if (!this.actionFoobar)
                    this.moveCheck( this.buildFooBar.bind(this) )
                else
                    this.buildFooBar()

                this.actionFoobar = true

                if (this.stock.foo.length==0 || this.stock.bar.length==0)
                    this.actionFoobar = false

            } else

            if (this.stock.bar.length < 6) {

                this.moveCheck( this.buildBar.bind(this) )

            } else

            if (this.stock.foo.length < 6) {

                this.moveCheck( this.buildFoo.bind(this) )

            }



        }

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