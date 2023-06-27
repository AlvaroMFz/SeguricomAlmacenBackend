const mongoose = require("mongoose");

const DetalleEstudioSchema = mongoose.Schema({
    idCliente:{
        type:String
    },
    idDetalle:{
        type:String
    },
    Estado:{
        type:String,
        default:'Pendiente'
    }
    
});

module.exports = mongoose.model('DetalleEstudio', DetalleEstudioSchema);

