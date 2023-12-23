const mongoose = require('mongoose');

const estadoParcelaEnum = ['Activa', 'En cosecha', 'Completado', 'Otro'];

const parcelaSchema = new mongoose.Schema({
  nombre: String,
  hectareas: Number,
  estado: {
    type: String,
    enum: estadoParcelaEnum,
    default: 'Activa',
  },
  hacienda: { type: mongoose.Schema.Types.ObjectId, ref: 'Hacienda' },
  cultivos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo' }], 
});

const Parcela = mongoose.model('Parcela', parcelaSchema);

module.exports = Parcela;
