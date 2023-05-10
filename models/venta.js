var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: Date, default: Date.now},
});

//TERMINE MAS APIS
//12345
module.exports = mongoose.model('venta', VentaSchema);