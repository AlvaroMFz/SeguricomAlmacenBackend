const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const userController = {};

function registrar(req, res){
    //const {nombres, apellidos, email, password, role} = req.body;
    const newUser = new User();
    console.log(req.body.email);
    //await newUser.save();

    var params = req.body;
    if(params.password){
        bcrypt.hash(params.password,null,null, function(err,hash){
            if(hash){
                newUser.password = hash;
                newUser.nombres = params.nombres;
                newUser.apellidos = params.apellidos;
                newUser.email = params.email;
                newUser.role = params.role;

                newUser.save((err,user_save)=>{
                    if(err){
                        res.status(500).send({error: 'No se ingreso el usuario'});
                    }else{
                        res.status(200).send({user:user_save})
                    }
                });
            }
        });
    }else{
        res.status(403).send({error: 'No se ingreso la contraseña'});
    }
};

function login(req, res){
    var data = req.body;

    User.findOne({email: data.email}, (err, user_data)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(user_data){
                bcrypt.compare(data.password, user_data.password, function(err,check){
                    if(check){
                        if(data.getToken){
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data
                            });
                        }else{
                            res.status(200).send({
                                user: user_data,
                                message: 'No token',
                                jwt: jwt.createToken(user_data)
                            });
                        }
                    }else{
                        res.status(403).send({message: 'La contraseña no coincide'});
                    }
                });
            }else{
                res.status(403).send({message: 'El correo no coincide'});
            }
        }
    });
}

function listar(req, res){
    User.find((err,users_data)=>{
        if(users_data){
            res.status(200).send({usuarios: users_data});
        }
    });
}

function editar(req, res){
    var id = req.params['id'];
    var data = req.body;

    if(data.password){
        bcrypt.hash(data.password,null,null, function(err,hash){
            if(hash){
               User.findByIdAndUpdate(id, {nombres: data.nombres, password: hash, email: data.email, role: data.role}, (err, user_edit)=>{
                if(user_edit){
                    res.status(200).send({user: user_edit});
                }else{
                    res.status(500).send({message: 'El usuario no se pudo editar'});
                }
               });
            }
        });
    }else{
        User.findByIdAndUpdate(id, {nombres: data.nombres, email: data.email, role: data.role}, (err, user_edit)=>{
            if(user_edit){
                res.status(200).send({user: user_edit});
            }else{
                res.status(500).send({message: 'El usuario no se pudo editar'});
            }
           });
    }

    User.findByIdAndUpdate(id, {}, (err, user_edit)=>{

    });
}

function get_user(req, res){
    var id = req.params['id'];

    User.findById(id, (err, user_data)=> {
        if(user_data){
            res.status(200).send({user: user_data})
        }else{
            res.status(403).send({message: 'No se encontró ningún registro'});
        }
    });
}

function eliminar(req, res) {
    var id = req.params['id'];

    User.findByIdAndRemove(id, (err, user_delete) => {
        if(user_delete){
            res.status(200).send({ser: user_delete});
        }else{
            res.status(500).send(err);
        }
    });
}


module.exports= { 
    registrar,
    login,
    listar,
    editar,
    get_user,
    eliminar
}