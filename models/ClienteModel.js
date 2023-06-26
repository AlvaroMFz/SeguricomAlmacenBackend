var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    correo_electronico: {
        type: String,
        required: true,
        unique: true
    },
    celular: {
        type: Number,
        required: true,
    },
    tipo_cliente:{
        type: String,
        required: true,
    },
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
    direccion:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type:Number,
        required:true,
        default:4
    },
    especialista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EspecialistaModel",
    },
    },
    {
        timestamp:true,
        versionKey:false,
    });

clienteSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

clienteSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password); // El metodo compare de bcrypt retorna "true" o "false"
};

module.exports = mongoose.model('Cliente', clienteSchema);