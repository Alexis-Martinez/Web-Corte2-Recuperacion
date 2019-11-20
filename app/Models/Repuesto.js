'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Repuesto extends Model {
    static get table(){
        return 'repuesto'
    }

    mecanicore(){
        return this.belongsTo('App/Models/MecanicoRe','hojaparte_idmec')
    }

    hojaparte(){
        return this.belongsTo('App/Models/HojaParte','hojaparte_id')
    }
}

module.exports = Repuesto
