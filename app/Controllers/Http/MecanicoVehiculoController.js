'use strict'

const Vehiculo = use('App/Models/Vehiculo');
const MecanicoRe = use('App/Models/MecanicoRe');
const MecanicoVehiculo = use('App/Models/MecanicoVehiculo');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with mecanicovehiculos
 */
class MecanicoVehiculoController {
  /**
   * Show a list of all mecanicovehiculos.
   * GET mecanicovehiculos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let mecanicovehiculo = await MecanicoVehiculo.query().with('mecanicore').with('vehiculo').fetch();

    return view.render('mecanicovehiculo/index',{mecanicovehiculo: mecanicovehiculo.toJSON()});
  }

  /**
   * Render a form to be used for creating a new mecanicovehiculo.
   * GET mecanicovehiculos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let mecanicore = await MecanicoRe.all();
    let vehiculo = await Vehiculo.all();
    return view.render('mecanicovehiculo/crear',{mecanicore:mecanicore.rows , vehiculo:vehiculo.rows})
  }

  /**
   * Create/save a new mecanicovehiculo.
   * POST mecanicovehiculos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const mecanicovehiculo = new MecanicoVehiculo();
    mecanicovehiculo.mecanicore_id = request.input('mecanicore_id');
    mecanicovehiculo.vehiculo_id = request.input('vehiculo_id');
    await mecanicovehiculo.save();
    return response.redirect("/mecanicovehiculo");
  }

  /**
   * Display a single mecanicovehiculo.
   * GET mecanicovehiculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing mecanicovehiculo.
   * GET mecanicovehiculos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const mecanicovehiculo = await MecanicoVehiculo.find(params.id);
    let mecanicore = await MecanicoRe.all();
    let vehiculo = await Vehiculo.all();
    return view.render('mecanicovehiculo/editar',{mecanicore:mecanicore.rows , vehiculo:vehiculo.rows , mecanicovehiculo:mecanicovehiculo})
  }

  /**
   * Update mecanicovehiculo details.
   * PUT or PATCH mecanicovehiculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const mecanicovehiculo = await MecanicoVehiculo.find(params.id);
    mecanicovehiculo.mecanicore_id = request.input('mecanicore_id');
    mecanicovehiculo.vehiculo_id = request.input('vehiculo_id');
    await mecanicovehiculo.save();
    return response.redirect("/mecanicovehiculo");
  }

  /**
   * Delete a mecanicovehiculo with id.
   * DELETE mecanicovehiculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const mecanicovehiculo = await MecanicorVehiculo.find(params.id);
    await mecanicovehiculo.delete();
    return response.redirect('/mecanicovehiculo');
  }
}

module.exports = MecanicoVehiculoController
