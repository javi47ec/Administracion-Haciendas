// models/maquinariaModel.js
const mongoose = require('mongoose');

const maquinariaSchema = new mongoose.Schema({
    nombre: { type: String },
    estado: {
        type: String,
        enum: ['Operativa', 'En reparación', 'En mantenimiento', 'Dada de baja'],
        default: 'Operativa',
    },
    marca: { type: String },
    modelo: { type: String },
    hacienda: { type: mongoose.Schema.Types.ObjectId, ref: 'Hacienda' },
});

const Maquinaria = mongoose.model('Maquinaria', maquinariaSchema);

module.exports = Maquinaria;
