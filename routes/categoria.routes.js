const express = require('express');
const categoriaController = require('../controllers/categoria.controller');

const api = express.Router();

api.post('/categoria/registrar', categoriaController.registrar);
api.get('/categoria/:id', categoriaController.obtenerCategoria);
api.put('/categoria/editar/:id', categoriaController.editar);
api.delete('/categoria/eliminar/:id', categoriaController.eliminar);
api.get('/categorias/:nombre?', categoriaController.listar);


module.exports = api;