const express = require('express');
const productoController = require('../controllers/producto.controller');
var multipart = require('connect-multiparty');
var path = multipart();

const api = express.Router();

api.post('/producto/registrar', productoController.registrar);

module.exports = api;