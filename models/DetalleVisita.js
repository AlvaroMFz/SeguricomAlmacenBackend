var mongoose = require('mongoose');

const DetalleVisitaSchema = mongoose.Schema({
    detalle_1: { //Descripción de las instalaciones
        type: String,
        required: true,
    },
    detalle_2: { //¿Existen sistemas de seguridad actualmente?
        type: String,
        required: true,
    },
    detalle_3: { // ¿Existe alguna vulneración física? (Ejemplo: Puertas o ventanas dañadas o sin cerradura adecuada)
        type: String,
        required: true,
    },
    detalle_4: { // Resumen de las conversaciones, temas discutidos y
        type: String,
        required: true,
    },
    detalle_5: { // Resumen de las observaciones clave y hallazgos durante la visita
        type: String,
        required: true,
    },
    detalle_6: { // Recomendaciones de importancia
        type: String,
        required: true,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
    },
});

module.exports = mongoose.model('DetalleVisita', DetalleVisitaSchema);
