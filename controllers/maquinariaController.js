// controllers/maquinariaController.js
const Maquinaria = require('../models/maquinariaModel');

module.exports = {
    // Obtener todas las máquinas
    getAllMaquinarias: async (req, res) => {
        try {
            const maquinarias = await Maquinaria.find();
            res.render('maquinarias/index', { maquinarias });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener las máquinas');
        }
    },

    // Mostrar formulario para nueva máquina
    showNewForm: (req, res) => {
        res.render('maquinarias/nueva');
    },

    // Crear una nueva máquina
    createMaquinaria: async (req, res) => {
    try {
        const { nombre, marca, modelo, estado } = req.body;  
        const nuevaMaquinaria = new Maquinaria({ nombre, marca, modelo, estado });
        await nuevaMaquinaria.save();
        res.redirect('/maquinarias');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la máquina');
    }
},

    // Mostrar formulario para editar máquina
    showEditForm: async (req, res) => {
        try {
            const maquinaria = await Maquinaria.findById(req.params.id);
            res.render('maquinarias/editar', { maquinaria });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener la máquina para editar');
        }
    },

    // Actualizar máquina
    updateMaquinaria: async (req, res) => {
        try {
            const { nombre, estado, marca, modelo } = req.body;
            await Maquinaria.findByIdAndUpdate(req.params.id, { nombre, estado, marca, modelo });
            res.redirect('/maquinarias');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar la máquina');
        }
    },

    // Eliminar máquina
    deleteMaquinaria: async (req, res) => {
        try {
            await Maquinaria.findByIdAndDelete(req.params.id);
            res.redirect('/maquinarias');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar la máquina');
        }
    },

    // Obtener detalle de una máquina
    getMaquinariaDetalle: async (req, res) => {
        try {
            const maquinaria = await Maquinaria.findById(req.params.id);
            res.render('maquinarias/detalle', { maquinaria });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener la máquina');
        }
    }
};
