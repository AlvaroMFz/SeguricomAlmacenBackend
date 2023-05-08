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
                        res.status(403).send({message: 'El correo o contraseña no coinciden'});
                    }
                });
            }else{
                res.status(403).send({message: 'El correo no existe'});
            }
        }
    });
}

/*
function registrar(req,res){
    var params = req.body;
    console.log(req)
}
*/ 


module.exports= { 
    registrar,
    login,
}