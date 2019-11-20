'use strict'

const Vehiculo = use('App/Models/Vehiculo');
const Cliente = use('App/Models/Cliente');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with vehiculos
 */
class VehiculoController {
  /**
   * Show a list of all vehiculos.
   * GET vehiculos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let vehiculo = await Vehiculo.query().with('cliente').fetch();
    return view.render('vehiculo/index',{vehiculo: vehiculo.toJSON()});
  }

  /**
   * Render a form to be used for creating a new vehiculo.
   * GET vehiculos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let cliente = await Cliente.all();
    return view.render('vehiculo/crear',{cliente:cliente.rows})
  }

  /**
   * Create/save a new vehiculo.
   * POST vehiculos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const vehiculo = new Vehiculo();
    vehiculo.modelo = request.input('modelo');
    vehiculo.color = request.input('color');
    vehiculo.fecha_ent = request.input('fecha_ent');
    vehiculo.hora_ent = request.input('hora_ent');
    vehiculo.cliente_id = request.input('cliente_id');
    await vehiculo.save();
    return response.redirect("/vehiculo");
  }

  /**
   * Display a single vehiculo.
   * GET vehiculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const vehiculo = await Vehiculo.find(params.id);
    return view.render('vehiculo/crear',{vehiculo:vehiculo});
  }

  /**
   * Render a form to update an existing vehiculo.
   * GET vehiculos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const vehiculo = await Vehiculo.find(params.id);
    let cliente = await Cliente.all();
    return view.render('vehiculo/editar',{cliente:cliente.rows , vehiculo:vehiculo})
  }

  /**
   * Update vehiculo details.
   * PUT or PATCH vehiculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const vehiculo = await Vehiculo.find(params.id);
    vehiculo.modelo = request.input('modelo');
    vehiculo.color = request.input('color');
    vehiculo.fecha_ent = request.input('fecha_ent');
    vehiculo.hora_ent = request.input('hora_ent');
    vehiculo.cliente_id = request.input('cliente_id');
    await vehiculo.save();
    return response.redirect("/vehiculo");
  }

  /**
   * Delete a vehiculo with id.
   * DELETE vehiculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const vehiculo = await Vehiculo.find(params.id);
    await vehiculo.delete();
    return response.redirect('/vehiculo');
  }
}

module.exports = VehiculoController
