const express = require('express');
const marcaController = require('../controllers/marca.controller');

const api = express.Router();

api.post('/marca/registrar', marcaController.registrar);
api.get('/marca/:id', marcaController.obtenerMarca);
api.put('/marca/editar/:id', marcaController.editar);
api.delete('/marca/eliminar/:id', marcaController.eliminar);
api.get('/marcas/:nombre?', marcaController.listar);


module.exports = api;