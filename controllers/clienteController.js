var Cliente = require('../models/client');

function registrar(req, res) {
    //let data = req.body;
    var cliente = new Cliente(req.body);
    

    cliente.save((err, cliente_save) => {
        if(cliente_save){
            res.status(200).send({cliente: cliente_save})
        }else{
            res.status(500).send(err);
        }
    });

}

module.exports = {
    registrar,

}