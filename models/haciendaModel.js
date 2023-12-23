// models/haciendaModel.js
const mongoose = require('mongoose');

const haciendaSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  email: String,
  telefono: Number,
  // Empleados de la hacienda
  empleados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' }],
  // Parcelas de la hacienda
  parcelas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parcela' }],
  // Cultivos de la hacienda
  cultivos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo' }],
  // Animales de la hacienda  
  animales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
});

const Hacienda = mongoose.model('Hacienda', haciendaSchema);

module.exports = Hacienda;
