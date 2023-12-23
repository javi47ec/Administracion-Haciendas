const mongoose = require('mongoose');

const estadoCultivoEnum = ['Activo', 'En cosecha', 'Completado', 'Otro'];

const cultivoSchema = new mongoose.Schema({
    nombre: {type: String},
    fechaSiembra: {type: Date},
    fechaCosecha: {type: Date},
    estado: {
        type: String,
        enum: estadoCultivoEnum,
        default: 'Activo',
    },
    hacienda: { type: mongoose.Schema.Types.ObjectId, ref: 'Hacienda' },
    parcela: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcela' },
});

const Cultivo = mongoose.model('Cultivo', cultivoSchema);

module.exports = Cultivo;
