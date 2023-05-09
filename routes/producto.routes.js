const express = require('express');
const productoController = require('../controllers/producto.controller');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir:'./uploads/productos'});

const api = express.Router();

api.post('/producto/registrar', path, productoController.registrar);

module.exports = api;