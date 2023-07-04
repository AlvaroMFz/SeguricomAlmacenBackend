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
api.get("/gerente/citas", clienteController2.visualizarCitas);
api.get("/gerente/citasPendiente", clienteController2.visualizarCitasP);
api.put("/gerente/citasPendiente/estado/:id", clienteController2.update_estadoCita);
api.get("/gerente/especialistas", clienteController2.visualizarEspecialistas);
api.get("/especialista/clientes", clienteController2.visualizarClienteAsignado);


module.exports = api;