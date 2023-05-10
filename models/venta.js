var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: Date, default: Date.now},
});

//TERMINE VENTA
module.exports = mongoose.model('venta', VentaSchema);