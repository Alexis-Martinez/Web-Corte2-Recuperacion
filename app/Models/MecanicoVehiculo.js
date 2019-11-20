'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MecanicoVehiculo extends Model {
    static get table(){
        return 'mecanicovehiculo'
    }

    mecanicore(){
        return this.belongsTo('App/Models/MecanicoRe','mecanicore_id')
    }

    vehiculo(){
        return this.belongsTo('App/Models/Vehiculo','vehiculo_id')
    }
}

module.exports = MecanicoVehiculo
