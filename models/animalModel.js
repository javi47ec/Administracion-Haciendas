// models/animalModel.js
const mongoose = require('mongoose');

const estadoAnimalEnum = ['Activo', 'Recién nacido', 'En reproducción', 'Otro'];

const animalSchema = new mongoose.Schema({
    nombre:{type:String} ,
    fechaNacimiento: {type:Date} ,
    raza: {type:String} ,
    sexo: {type:String},
    observaciones: {type:String},
    estado: {
        type: String,
        enum: estadoAnimalEnum,
        default: 'Activo',
    },
    hacienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hacienda',
    },

});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
