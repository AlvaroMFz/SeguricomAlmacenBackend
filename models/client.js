var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    nombre: String,
    apellido: String,
    correo_electronico: {
        type: String,
        required: true,
        unique: true
    },
    celular: Number,
    tipo_cliente: String,
    dni: {
        type: String,
        required: true,
        // unique: true,
        default: "-"
    },
    ruc:{
        type: String,
        required: true,
        // unique: true,
        default: "-"
    },
    direccion: String,
    password:{
        type: String,
        required: true
    },
    rol:{
        type:Number,
        required:true,
        default:4
    },
    estado:{
        type: String,
        default: "Disponible"
    },
    especialista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EspecialistaModel",
    },
    },
  );


module.exports = mongoose.model('client', ClientSchema);