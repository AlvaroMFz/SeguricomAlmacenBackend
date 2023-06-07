const marca = require('../models/marca');
var Marca = require('../models/marca');

function registrar(req,res){
     var data = req.body;

     var marca = new Marca();
     marca.titulo = data.titulo;
     marca.descripcion = data.descripcion;

     marca.save((err, marca_save)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(marca_save){
                res.status(200).send({marca: marca_save});
            }else{
                res.status(403).send({message: 'La marca no se pudo registrar'});
            }
        }
     });
}

function obtenerMarca(req,res){
    var id = req.params['id'];
    
    Marca.findById({_id: id}, (err,marca_data) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(marca_data){
                res.status(200).send({marca: marca_data});
            }else{
                res.status(403).send({message: 'La marca no existe'});
            }
        }
    });
}

function editar(req,res){
    var id = req.params['id'];
    var data = req.body; 

    Marca.findByIdAndUpdate({_id:id}, {titulo: data.titulo, descripcion: data.descripcion}, (err, marca_edit) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(marca_edit){
                res.status(200).send({marca: marca_edit});
            }else{
                res.status(403).send({message: 'La marca no se pudo actualizar'});
            }
        }
    });
}

function eliminar(req, res){
    var id = req.params['id'];

    Marca.findByIdAndRemove({_id:id}, (err,marca_delete) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(marca_delete){
                res.status(200).send({marca: marca_delete});
            }else{
                res.status(403).send({message: 'La marca no se pudo eliminar'});
            }
        }
    });
}

function listar(req, res){
    var nombre = req.params['nombre'];

    Marca.find({titulo: new RegExp(nombre, 'i')}, (err, marca_listado) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(marca_listado){
                res.status(200).send({marcas: marca_listado});
            }else{
                res.status(403).send({message: 'No hay registros con ese titulo'});
            }
        }
    });
}

module.exports = {
    registrar,
    obtenerMarca,
    editar,
    eliminar,
    listar,
}