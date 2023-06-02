const express = require('express');
const productoController = require('../controllers/producto.controller');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir:'./uploads/productos'});

const api = express.Router();

api.post('/producto/registrar', path, productoController.registrar);
api.get('/productos/:titulo?', productoController.listar);
api.put('/productos/editar/:id/:img', path, productoController.editar);
api.get('/producto/registro/:id', productoController.obtener_producto);
api.delete('/producto/:id', productoController.eliminar);
api.put('/producto/stock/:id', productoController.update_stock);
api.get('/producto/img/:img',productoController.get_img);

module.exports = api;