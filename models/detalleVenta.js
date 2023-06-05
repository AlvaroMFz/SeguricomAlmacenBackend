var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleVentaSchema = Schema({
    idproducto: {type: Schema.ObjectId, ref: 'Producto'},
    cantidad: Number,
    venta: {type:Schema.ObjectId, ref:'venta'}
});

module.exports = mongoose.model('detalleventa', DetalleVentaSchema);