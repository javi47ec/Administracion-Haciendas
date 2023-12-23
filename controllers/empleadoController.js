const Empleado = require('../models/empleadoModel');
const Hacienda = require('../models/haciendaModel');

exports.getAllEmpleados = async (req, res) => {
    const empleados = await Empleado.find();
    res.render('empleados/index', { empleados });
};

exports.getNuevoEmpleado = (req, res) => {
    res.render('empleados/nueva');
};

exports.postNuevoEmpleado = async (req, res) => {
    try {
        const empleado = new Empleado(req.body);
        console.log('Datos del formulario:', req.body);
        await empleado.save();
        console.log('Nuevo empleado creado:', empleado);
        res.redirect('/empleados');
    } catch (error) {
        console.error('Error al crear un nuevo empleado:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.getEmpleadoDetalle = async (req, res) => {
    const empleado = await Empleado.findById(req.params.id);
    res.render('empleados/detalle', { empleado });
};

exports.eliminarEmpleado = async (req, res) => {
    await Empleado.findByIdAndDelete(req.params.id);
    res.redirect('/empleados');
};

exports.getEditarEmpleado = async (req, res) => {
    const haciendas = await Hacienda.find();    
    const empleado = await Empleado.findById(req.params.id);
    console.log('Haciendas', haciendas);
    console.log('Empleado con hacienda', empleado);
    res.render('empleados/editar', { empleado, haciendas });
};

exports.postEditarEmpleado = async (req, res) => {
    try {
        const empleado = req.params.id;
        const { nombre, apellido, fechaNacimiento, fechaIngreso, dni, salario, telefono, cargo, direccion, hacienda } = req.body;

        // Lógica para actualizar el empleado con los nuevos datos
        const empleadoActualizado = await Empleado.findByIdAndUpdate(
            empleado,
            { nombre, apellido, fechaNacimiento, fechaIngreso, dni, salario, telefono, direccion, cargo, hacienda },
            { new: true } // Para obtener el empleado actualizado
        );

        console.log('Empleado actualizado:', empleadoActualizado);
        res.redirect('/empleados');
    } catch (error) {
        console.error('Error al editar empleado:', error);
        res.status(500).send('Error interno del servidor');
    }
};


