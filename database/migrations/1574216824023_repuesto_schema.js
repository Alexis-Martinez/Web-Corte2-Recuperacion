'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepuestoSchema extends Schema {
  up () {
    this.create('repuesto', (table) => {
      table.increments()
      table.string('descripcion',45).notNullable()
      table.integer('costounit').notNullable()
      table.integer('preciounit').notNullable()
      table.integer('imp_parcial').notNullable()
      table.integer('hojaparte_id',45).unsigned().references('id').inTable('hojaparte')
      table.integer('hojaparte_idmec').unsigned().references('mecanicore_id').inTable('hojaparte')
      table.timestamps()
    })
  }

  down () {
    this.drop('repuesto')
  }
}

module.exports = RepuestoSchema
