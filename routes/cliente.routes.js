const express = require('express');
const clienteController = require('../controllers/cliente.controller');
const clienteController2 = require('../controllers/clienteController');

const api = express.Router();

api.post('/cliente', clienteController.registrar);
api.put('/cliente/editar/:id', clienteController.editar);
api.delete('/cliente/eliminar/:id', clienteController.eliminar);
api.post("/cliente/registrar", clienteController2.registrar);
api.post("/cliente/autenticar", clienteController2.autenticar);
api.post("/cliente/:idCliente", clienteController2.solicitarCita);
//Rutas para obtener al Cliente y Especialista
api.get("/cliente", clienteController2.ObtenerClientes);
api.get("/cliente/:id", clienteController2.ObtenerUsuario);
api.get("/cliente/especialistas", clienteController2.ObtenerEspecialista);


module.exports = api;