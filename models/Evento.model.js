const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // le indicamos que haga una referencia
        ref: 'Usuario', // la referencia va a ser a Usuario, es decir el id de usuario debe ser el mismo que el que existe en el schema de UsuarioSchema
        required: true
    }
});

/**
 * * cuando se ejecuta el metodo toJSON se extraen las propiedades y 
 * * que las propiedades _id y __v se puedan modificar en el json del serializador que es mongose
 * * Esta funcion elimina el __v, _id del EventoSchema.
 */
EventoSchema.method('toJSON', function() { 
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema);