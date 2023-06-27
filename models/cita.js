var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitaSchema = Schema({
    idDetalle: {type: Schema.ObjectId, ref: 'DetalleEstudio'},
    idCliente: {type: Schema.ObjectId, ref: 'client'},
});

module.exports = mongoose.model('cita', CitaSchema);