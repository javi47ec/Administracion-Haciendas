const Cultivo = require('../models/cultivoModel');
const Hacienda = require('../models/haciendaModel');
const Parcela = require('../models/parcelaModel'); // Agrega esta línea

exports.getAllCultivos = async (req, res) => {
    const cultivos = await Cultivo.find().populate('hacienda').populate('parcela'); // Modifica aquí
    res.render('cultivos/index', { cultivos });
};

exports.getNuevoCultivo = async (req, res) => {
   const haciendas = await Hacienda.find();
   const parcelas = await Parcela.find(); // Agrega esta línea
   res.render('cultivos/nueva', { haciendas, parcelas }); // Modifica aquí
}

exports.postNuevoCultivo = async (req, res) => {
    try {
        const { nombre, fechaSiembra, fechaCosecha, estado, hacienda, parcela } = req.body;

        // Asegúrate de que hacienda sea un solo valor (por ejemplo, el primer elemento del array)
        const haciendaId = Array.isArray(hacienda) ? hacienda[0] : hacienda;

        // Crea un nuevo cultivo
        const nuevoCultivo = new Cultivo({ nombre, fechaSiembra, fechaCosecha, estado, hacienda: haciendaId, parcela });
        await nuevoCultivo.save();

        res.redirect('/cultivos');
    } catch (error) {
        console.error('Error al crear un nuevo cultivo:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.getCultivoDetalle = async (req, res) => {
    try {
        const cultivo = await Cultivo.findById(req.params.id).populate('hacienda').populate('parcela');
        const haciendas = await Hacienda.find();
        const parcelas = await Parcela.find(); 
        res.render('cultivos/detalle', { cultivo, haciendas, parcelas });
    } catch (error) {
        console.error('Error al obtener los detalles del cultivo:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.getEditarCultivo = async (req, res) => {
    const haciendas = await Hacienda.find();
    const parcelas = await Parcela.find(); // Agrega esta línea
    const cultivo = await Cultivo.findById(req.params.id);
    
    res.render('cultivos/editar', { cultivo, haciendas, parcelas }); // Modifica aquí
}

exports.postEditarCultivo = async (req, res) => {
    try {
        const cultivoId = req.params.id;
        const { nombre, fechaSiembra, fechaCosecha, estado, hacienda, parcela } = req.body;
    
        // Lógica para actualizar el cultivo con los nuevos datos
        const cultivoActualizado = await Cultivo.findByIdAndUpdate(
            cultivoId,
            { nombre, fechaSiembra, fechaCosecha, estado, hacienda, parcela },
            { new: true } // Para obtener el cultivo actualizado
        );
        console.log('Cultivo actualizado:', cultivoActualizado);
        res.redirect('/cultivos');
    } catch (error){
        console.error('Error al actualizar un cultivo:', error);
        res.status(500).send('Error interno del servidor');
    }
};
