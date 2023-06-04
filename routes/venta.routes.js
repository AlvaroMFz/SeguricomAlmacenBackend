const express = require('express');
const ventaController = require('../controllers/venta.controller');

const api = express.Router();

api.post('/venta/registrar', ventaController.registrar)


module.exports = api;