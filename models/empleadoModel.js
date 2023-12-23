var mongoose = require('mongoose');
const empleadoSchema = new mongoose.Schema({
    nombre: {type: String},
    apellido:  {type: String},
    fechaNacimiento: {type: Date},
    fechaIngreso:{type:Date},
    dni: {type: Number},
    cargo: {type: String},
    salario: {type: Number},
    telefono: {type: Number},
    direccion: {type: String},
    
    hacienda: { type: mongoose.Schema.Types.ObjectId, ref: 'Hacienda' },
});
const Empleado = mongoose.model('Empleado', empleadoSchema);
module.exports = Empleado;