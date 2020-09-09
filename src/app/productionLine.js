'use strict'



import Robot from './robot'



/**
 * ProductionLine in charge of Robots
 */
class ProductionLine {


    /**
     *
     * @param robotsQuantity
     */
    constructor( robotsQuantity ) {

        this.debug = true

        this.robots = []

        this.time = 0



        //this.log( robotsQuantity )

        if (robotsQuantity > 0) {

            for (let id = 0; id < robotsQuantity; id++) {

                this.robotAdd()

            }


        }

        this.log( this.robots )



    }


    /**
     * adds a robot (used by Robot, 'this' reference)
     */
    robotAdd() {

        let id = this.robots.length

        this.robots.push( new Robot( id , this ) )

    }


    /**
     * called by Factory.vue
     */
    render(  ) {

        //this.log( time )

        for (let id = 0; id < this.robots.length; id++) {

            this.getRobot( id ).render()

        }

    }


    /**
     * getRobot
     * @param index
     * @returns {*}
     */
    getRobot( index ) {

        if ( index > -1 && index < this.robots.length )
            return this.robots[ index ]

        return null

    }


    /**
     * log for debug purposes
     * @param m
     */
    log( m ) {

        if (this.debug)
            console.log( '> ProductionLine' , m )

    }

}

export default ProductionLine