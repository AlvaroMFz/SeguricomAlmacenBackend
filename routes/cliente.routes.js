const express = require('express');
const clienteController = require('../controllers/cliente.controller');
const clienteController2 = require('../controllers/clienteController');

const api = express.Router();

api.post('/cliente', clienteController.registrar);
api.put('/cliente/editar/:id', clienteController.editar);
api.delete('/cliente/eliminar/:id', clienteController.eliminar);
api.post("/cliente/registrar", clienteController2.registrar);

module.exports = api;