'use strict'

import Robot from "./robot"

class ProductionLine {

    constructor( robotsQuantity ) {

        this.debug = true

        this.robots = []

        //this.log( robotsQuantity )

        if (robotsQuantity > 0) {

            for (let i = 0; i < robotsQuantity; i++) {

                this.robots.push( new Robot())

            }

        }

        this.log( this.robots )



    }



    log( m ) {

        if (this.debug)
            console.log( '> ProductionLine' , m )

    }

}

export default ProductionLine