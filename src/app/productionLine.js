'use strict'



import Robot from './robot'



class ProductionLine {



    constructor( robotsQuantity ) {

        this.debug = true

        this.robots = []

        this.time = 0



        //this.log( robotsQuantity )

        if (robotsQuantity > 0) {

            for (let id = 0; id < robotsQuantity; id++) {

                this.robots.push( new Robot( id ) )

            }


        }

        this.log( this.robots )



    }



    render(  ) {

        //this.log( time )

    }



    getRobot( index ) {

        if ( index > -1 && index < this.robots.length )
            return this.robots[ index ]

        return null

    }



    log( m ) {

        if (this.debug)
            console.log( '> ProductionLine' , m )

    }

}

export default ProductionLine