var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarcaSchema = Schema({
    titulo: String,
    descripcion: String,
});

module.exports = mongoose.model('marca', MarcaSchema);