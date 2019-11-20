'use strict'

const Repuesto = use('App/Models/Repuesto');
const Mecanicore = use('App/Models/Mecanicore');
const Hojaparte = use('App/Models/Hojaparte');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with repuestos
 */
class RepuestoController {
  /**
   * Show a list of all repuestos.
   * GET repuestos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let repuesto = await Repuesto.query().with('hojaparte').with('mecanicore').fetch();
    return view.render('repuesto/index',{repuesto: repuesto.toJSON()});
  }

  /**
   * Render a form to be used for creating a new repuesto.
   * GET repuestos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let hojaparte = await Hojaparte.all();
    let hojaparte2 = await Hojaparte.query().with('mecanicore').fetch();
    return view.render('repuesto/crear',{hojaparte:hojaparte.rows , hojaparte2:hojaparte2.toJSON()})
  }

  /**
   * Create/save a new repuesto.
   * POST repuestos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const repuesto = new Repuesto();
    repuesto.descripcion = request.input('descripcion');
    repuesto.costounit = request.input('costounit');
    repuesto.preciounit = request.input('preciounit');
    repuesto.imp_parcial = request.input('imp_parcial');
    repuesto.hojaparte_id = request.input('hojaparte_id');
    repuesto.hojaparte_idmec = request.input('hojaparte_idmec');
    await repuesto.save();
    return response.redirect("/repuesto");
  }

  /**
   * Display a single repuesto.
   * GET repuestos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing repuesto.
   * GET repuestos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const repuesto = await Repuesto.find(params.id);
    let hojaparte = await Hojaparte.all();
    let hojaparte2 = await Hojaparte.query().with('mecanicore').fetch();
    return view.render('repuesto/editar',{hojaparte:hojaparte.rows , hojaparte2:hojaparte2.toJSON() , repuesto:repuesto})
  }

  /**
   * Update repuesto details.
   * PUT or PATCH repuestos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const repuesto = await Repuesto.find(params.id);
    repuesto.descripcion = request.input('descripcion');
    repuesto.costounit = request.input('costounit');
    repuesto.preciounit = request.input('preciounit');
    repuesto.imp_parcial = request.input('imp_parcial');
    repuesto.hojaparte_id = request.input('hojaparte_id');
    repuesto.hojaparte_idmec = request.input('hojaparte_idmec');
    await repuesto.save();
    return response.redirect("/repuesto");
  }

  /**
   * Delete a repuesto with id.
   * DELETE repuestos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const repuesto = await Repuesto.find(params.id);
    await repuesto.delete();
    return response.redirect('/repuesto');
  }
}

module.exports = RepuestoController
