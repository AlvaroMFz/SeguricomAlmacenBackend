var mongoose = require('mongoose');

const DetalleCotizacionSchema = mongoose.Schema({
        descripcion: {
            type: String,
            required: true,
          },
          precioUnitario: {
            type: Number,
            required: true,
          },
          cantidad: {
            type: Number,
            required: true,
          },
          impuestos: {
            type: Number,
            default: 0,
          },
          descuentos: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            required: true,
          },
          cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "client",
        },
    });


module.exports = mongoose.model('DetalleCotizacion', DetalleCotizacionSchema);