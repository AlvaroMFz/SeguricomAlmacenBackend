const express = require('express');
const especialistaController = require('../controllers/especialistaController');

const api = express.Router();

api.post("/especialista/:idCliente",especialistaController.RegistrarDetalleVisita);
api.post("/especialista/cotizacion/:idCliente",especialistaController.RegistrarCotizacion);
api.get("/especialista/cotizacion/:idCotizacion",especialistaController.ObtenerCotizacionesID);
api.get("/especialista/cotizacion",especialistaController.ObtenerCotizaciones);

module.exports = api;