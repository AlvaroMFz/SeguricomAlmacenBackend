const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
var Cliente = require('../models/client');
const DetalleEstudio = require('../models/DetalleEstudio');

function ObtenerClientes(req, res) {
    try {
        Cliente.find({})
            .then(function (clientes) {
                const clientesJSON = JSON.parse(JSON.stringify(clientes));
                res.status(200).json({ clientes: clientesJSON });
            })
            .catch(function (error) {
                throw error;
            });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}
function ObtenerUsuario(req, res) {
    /* const { idCliente } = req.params;
     try {
         const cliente = Cliente.findById(idCliente);
         res.status(200).json(cliente);
     } catch (error) {
 
     }*/
    var id = req.params['id'];

    Cliente.findById(id, (err, user_data) => {
        if (user_data) {
            res.status(200).send({ user: user_data })
        } else {
            res.status(403).send({ message: 'No se encontró ningún registro' });
        }
    });
}
function ObtenerEspecialista(req, res) {
    try {
        Cliente.find({ rol: 3 })
            .then(function (clientes) {
                const clientesJSON = JSON.parse(JSON.stringify(clientes));
                res.status(200).json({ clientes: clientesJSON });
            })
            .catch(function (error) {
                throw error;
            });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}


function registrar(req, res) {
    //let data = req.body;
    var cliente = new Cliente(req.body);

    if (cliente.password) {
        bcrypt.hash(cliente.password, null, null, function (err, hash) {
            if (hash) {
                cliente.password = hash;

                cliente.save((err, cliente_save) => {
                    if (err) {
                        res.status(500).send({ error: 'No se ingreso el usuario' });
                    } else {
                        res.status(200).send({ cliente: cliente_save })
                    }
                });
            }
        });
    }
}

function autenticar(req, res) {
    const { correo_electronico, password } = req.body;
    Cliente.findOne({ correo_electronico }, (err, cliente) => {
        if (cliente) {
            bcrypt.compare(password, cliente.password, function (err, check) {
                if (check) {
                    res.status(200).send({
                        jwt: jwt.createToken(cliente),
                        cliente: cliente
                    });
                } else {
                    res.status(403).send({ message: 'La contraseña no coincide' });
                }
            });
        }
    });
}

function solicitarCita(req, res) {
    const { idCliente } = req.params;
    // const cliente = Cliente.findById(idCliente);

    try {
        const {
            respuesta_1,
            respuesta_2,
            respuesta_3,
            respuesta_4,
            respuesta_5,
            respuesta_6,
            respuesta_7,
            respuesta_8,
            respuesta_9,
        } = req.body;

        const detalleEstudio = new DetalleEstudio({
            respuesta_1,
            respuesta_2,
            respuesta_3,
            respuesta_4,
            respuesta_5,
            respuesta_6,
            respuesta_7,
            respuesta_8,
            respuesta_9,
            cliente: idCliente
        });

        detalleEstudio.save();
        res.status(200).json({ detalleEstudio: detalleEstudio })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
function InsertarCita(req,res){
    const{idCliente,idDetalle} = req.params
    try{
        const detallecita = new DetalleCita({
            idCliente,
            idDetalle,
            estado
        });
        detallecita.save();
        res.status(200).json({detallecita:detallecita})
    }catch (error) {
        res.status(500).json({msg: error.message})
    }
}

function visualizarCitas(req, res) {
    DetalleEstudio.find().populate('cliente').exec((err, clientes_data) => {
        if (clientes_data) {
            res.status(200).send({ clientesP: clientes_data });
        }
    });
}
function visualizarCitasP(req, res) {
    if ({estado : "Pendiente"}) {
        DetalleEstudio.find({estado : "Pendiente"}).populate('cliente').exec((err, clientes_data) => {
            if (clientes_data) {
                res.status(200).send({ clientesP: clientes_data });
            }
        });
    }
    else{
        res.status(403).send({ message: 'No existe el estado' });
    }
}

function update_estadoCita(req, res) {
    let id = req.params['id'];
    let data = req.body;

    DetalleEstudio.findByIdAndUpdate(id, {estado: "Asignado"}, (err, cliente_edit) => {
        if(cliente_edit){
            res.status(200).send({cliente: cliente_edit});
        }else{
            res.status(500).send(err);
        }
    });

}

function visualizarEspecialistas(req,res) {
    Cliente.find({rol: 3},(err,users_data)=>{
        if(users_data){
            res.status(200).send({usuarios: users_data});
        }
    });
}

function asignarCita(req,res){

}
module.exports = {
    registrar,
    autenticar,
    ObtenerClientes,
    ObtenerEspecialista,
    solicitarCita,
    ObtenerUsuario,
    visualizarCitas,
    visualizarCitasP,
    update_estadoCita,
    visualizarEspecialistas
}