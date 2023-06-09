const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
var Cliente = require('../models/client');
const DetalleEstudio = require('../models/DetalleEstudio');

function registrar(req, res) {
    //let data = req.body;
    var cliente = new Cliente(req.body);

    if (cliente.password) {        
        bcrypt.hash(cliente.password,null,null, function(err,hash){
            if(hash){
                cliente.password = hash;
    
                cliente.save((err,cliente_save)=>{
                    if(err){
                        res.status(500).send({error: 'No se ingreso el usuario'});
                    }else{
                        res.status(200).send({cliente:cliente_save})
                    }
                });
            }
        });
    }
}

function autenticar(req, res) {
    const {correo_electronico, password} = req.body;
    Cliente.findOne({correo_electronico}, (err, cliente) => {
        if (cliente) {
            bcrypt.compare(password, cliente.password, function(err,check){
                if(check){
                    res.status(200).send({
                        jwt: jwt.createToken(cliente),
                        cliente: cliente
                    });
                }else{
                    res.status(403).send({message: 'La contraseña no coincide'});
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
        res.status(200).json({detalleEstudio: detalleEstudio})
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    registrar,
    autenticar,
    solicitarCita
}