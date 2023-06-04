var express = require('express');
var ventaController =  require('../controllers/venta.controller');

var api = express.Router();

api.post('/venta"/registrar',ventaController.registrar);
api.get('/venta/datos/:id',ventaController.datos_id);

module.exports = api;