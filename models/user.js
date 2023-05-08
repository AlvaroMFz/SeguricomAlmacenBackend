const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    role: String,
});

module.exports = mongoose.model('users', UserSchema);