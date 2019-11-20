'use strict'

const Hojaparte = use('App/Models/Hojaparte');
const Mecanicore = use('App/Models/Mecanicore');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with hojapartes
 */
class HojaParteController {
  /**
   * Show a list of all hojapartes.
   * GET hojapartes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let hojaparte = await Hojaparte.query().with('mecanicore').fetch();
    return view.render('hojaparte/index',{hojaparte: hojaparte.toJSON()});
  }

  /**
   * Render a form to be used for creating a new hojaparte.
   * GET hojapartes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let mecanicore = await Mecanicore.all();
    return view.render('hojaparte/crear',{mecanicore:mecanicore.rows})
  }

  /**
   * Create/save a new hojaparte.
   * POST hojapartes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const hojaparte = new Hojaparte();
    hojaparte.concepto = request.input('concepto');
    hojaparte.cantidad = request.input('cantidad');
    hojaparte.reparacion = request.input('reparacion');
    hojaparte.mecanicore_id = request.input('mecanicore_id');
    await hojaparte.save();
    return response.redirect("/hojaparte");
  }

  /**
   * Display a single hojaparte.
   * GET hojapartes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing hojaparte.
   * GET hojapartes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const hojaparte = await Hojaparte.find(params.id);
    let mecanicore = await Mecanicore.all();
    return view.render('hojaparte/editar',{mecanicore:mecanicore.rows , hojaparte:hojaparte})
  }

  /**
   * Update hojaparte details.
   * PUT or PATCH hojapartes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const hojaparte = await Hojaparte.find(params.id);
    hojaparte.concepto = request.input('concepto');
    hojaparte.cantidad = request.input('cantidad');
    hojaparte.reparacion = request.input('reparacion');
    hojaparte.mecanicore_id = request.input('mecanicore_id');
    await hojaparte.save();
    return response.redirect("/hojaparte");
  }

  /**
   * Delete a hojaparte with id.
   * DELETE hojapartes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const hojaparte = await Hojaparte.find(params.id);
    await hojaparte.delete();
    return response.redirect('/hojaparte');
  }
}

module.exports = HojaParteController
