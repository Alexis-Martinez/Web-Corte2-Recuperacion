'use strict'

const Mecanicore = use('App/Models/MecanicoRe');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with mecanicores
 */
class MecanicoReController {
  /**
   * Show a list of all mecanicores.
   * GET mecanicores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let mecanicore = await Mecanicore.all();
    return view.render('mecanicore/index',{mecanicore: mecanicore.rows});
  }

  /**
   * Render a form to be used for creating a new mecanicore.
   * GET mecanicores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('mecanicore/crear')
  }

  /**
   * Create/save a new mecanicore.
   * POST mecanicores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const mecanicore = new Mecanicore();
    mecanicore.nombre = request.input('nombre');
    mecanicore.direccion = request.input('direccion');
    mecanicore.telefono = request.input('telefono');
    mecanicore.costoxhora = request.input('costoxhora');
    mecanicore.categoria = request.input('categoria');
    await mecanicore.save();
    return response.redirect("/mecanicore");
  }

  /**
   * Display a single mecanicore.
   * GET mecanicores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const mecanicore = await Mecanicore.find(params.id);
    return view.render('mecanicore/crear',{mecanicore:mecanicore});
  }

  /**
   * Render a form to update an existing mecanicore.
   * GET mecanicores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let mecanicore = await Mecanicore.find(params.id);
    return view.render('mecanicore/editar',{mecanicore})
  }

  /**
   * Update mecanicore details.
   * PUT or PATCH mecanicores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const mecanicore = await Mecanicore.find(params.id);
    mecanicore.nombre = request.input('nombre');
    mecanicore.direccion = request.input('direccion');
    mecanicore.telefono = request.input('telefono');
    mecanicore.costoxhora = request.input('costoxhora');
    mecanicore.categoria = request.input('categoria');
    await mecanicore.save();
    return response.redirect("/mecanicore");
  }

  /**
   * Delete a mecanicore with id.
   * DELETE mecanicores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const mecanicore = await Mecanicore.find(params.id);
    await mecanicore.delete();
    return response.redirect('/mecanicore');
  }
}

module.exports = MecanicoReController
