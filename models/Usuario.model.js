const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
  });

module.exports = model('Usuario', UsuarioSchema);

