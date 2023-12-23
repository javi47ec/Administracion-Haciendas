const Parcela = require("../models/parcelaModel");
const Hacienda = require("../models/haciendaModel");

exports.getAllParcelas = async (req, res) => {
  const parcelas = await Parcela.find().populate('hacienda');
  res.render("parcelas/index", { parcelas });
};

exports.getNuevaParcela = async (req, res) => {
    const haciendas = await Hacienda.find();
    res.render("parcelas/nueva", { haciendas });
};

exports.postNuevaParcela = async (req, res) => {
    try {
        const parcela = new Parcela(req.body);
        console.log('Datos del formulario:', req.body);
        await parcela.save();
        console.log('Nueva parcela creada:', parcela);
        res.redirect('/parcelas');
    } catch (error) {
        console.error('Error al crear una nueva parcela:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.getParcelaDetalle = async (req, res) => {
    const parcela = await Parcela.findById(req.params.id);
    const haciendas = await Hacienda.find();
    res.render("parcelas/detalle", { parcela, haciendas });
}

exports.eliminarParcela = async (req, res) => {
    await Parcela.findByIdAndDelete(req.params.id);
    res.redirect("/parcelas");
};

exports.getEditarParcela = async (req, res) => {
    const haciendas = await Hacienda.find();
    const parcela = await Parcela.findById(req.params.id);
    res.render("parcelas/editar", { parcela, haciendas });
};

exports.postEditarParcela = async (req, res) => {
    try {
        const parcelaId = req.params.id;
        const { nombre, hectareas, estado, hacienda } = req.body;
    
        // Lógica para actualizar el empleado con los nuevos datos
        const parcelaActualizada = await Parcela.findByIdAndUpdate(
            parcelaId,
            { nombre, hectareas, estado, hacienda },
            { new: true } // Para obtener el empleado actualizado
        );
        console.log('Parcela actualizada:', parcelaActualizada);
        res.redirect('/parcelas');
    } catch (error){
        console.error('Error al actualizar la parcela:', error);
        res.status(500).send('Error interno del servidor');
    }
}

