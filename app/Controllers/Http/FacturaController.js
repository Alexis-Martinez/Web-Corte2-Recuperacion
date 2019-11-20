'use strict'

const Factura = use('App/Models/Factura');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with facturas
 */
class FacturaController {
  /**
   * Show a list of all facturas.
   * GET facturas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let factura = await Factura.all();
    return view.render('factura/index',{factura: factura.rows});
  }

  /**
   * Render a form to be used for creating a new factura.
   * GET facturas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('factura/crear')
  }

  /**
   * Create/save a new factura.
   * POST facturas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const factura = new Factura();
    factura.fecha = request.input('fecha');
    factura.imp_pesos = request.input('imp_pesos');
    factura.imp_dol = request.input('imp_dol');
    factura.rfc = request.input('rfc');
    await factura.save();
    return response.redirect("/factura");
  }

  /**
   * Display a single factura.
   * GET facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const factura = await Factura.find(params.id);
    return view.render('factura/crear',{factura:factura});
  }

  /**
   * Render a form to update an existing factura.
   * GET facturas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let factura = await Factura.find(params.id);
    return view.render('factura/editar',{factura})
  }

  /**
   * Update factura details.
   * PUT or PATCH facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let factura = await Factura.find(params.id);
    factura.fecha = request.input('fecha');
    factura.imp_pesos = request.input('imp_pesos');
    factura.imp_dol = request.input('imp_dol');
    factura.rfc = request.input('rfc');
    await factura.save();
    return response.redirect("/factura");
  }

  /**
   * Delete a factura with id.
   * DELETE facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const factura = await Factura.find(params.id);
    await factura.delete();
    return response.redirect('/factura');
  }
}

module.exports = FacturaController
