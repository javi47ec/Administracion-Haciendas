//controllers/haciendaController.js
const Hacienda = require("../models/haciendaModel");

exports.getAllHaciendas = async (req, res) => {
  const haciendas = await Hacienda.find();
  res.render("haciendas/index", { haciendas });
};

exports.getNuevoHacienda = (req, res) => {
  res.render("haciendas/nueva");
};

exports.postNuevaHacienda = async (req, res) => {
  try {
      const { nombre, direccion, email, telefono } = req.body;

      // Crea una nueva hacienda
      const nuevaHacienda = new Hacienda({ nombre, direccion, email, telefono });
      await nuevaHacienda.save();

      res.redirect('/haciendas');
  } catch (error) {
      // Verifica si el error es de validación
      if (error.errors) {
          const errores = Object.values(error.errors).map((e) => e.message);
          // Puedes hacer algo con los errores, como enviarlos a la vista o registrarlos
          console.error('Errores de validación:', errores);
          // Puedes enviar una respuesta al usuario o redirigirlo, según tus necesidades
          res.status(400).send('Error de validación');
      } else {
          // Si no es un error de validación, maneja el error de otra manera
          console.error('Error al crear una nueva hacienda:', error);
          res.status(500).send('Error interno del servidor');
      }
  }
};


exports.getHaciendaDetalle = async (req, res) => {
  try {
    const hacienda = await Hacienda.findById(req.params.id);
    res.render("haciendas/detalle", { hacienda });
  }catch(err){
    console.log(error)
    res.status(404).send('No se encontro la hacienda');
  }
};

exports.eliminarHacienda = async (req, res) => {
  try {
    await Hacienda.findByIdAndDelete(req.params.id);
    res.redirect("/haciendas");
  }catch(err){
    console.log(error)
    res.status(404).send('Error al eliminar la hacienda');
  }
};

exports.getEditarHacienda = async (req, res) => {

  try {
    const hacienda = await Hacienda.findById(req.params.id);
    res.render("haciendas/editar", { hacienda });
  }catch(err){
    console.log(error)
    res.status(404).send('No se encontro la hacienda');
  }
};

exports.getNuevaHacienda = (req, res) => {
  res.render("haciendas/nueva");
};

exports.postNuevaHacienda = async (req, res) => {
  const hacienda = new Hacienda(req.body);
  await hacienda.save();
  res.redirect("/haciendas");
}
exports.postEditarHacienda = async (req, res) => {
  try {
    const haciendaId = req.params.id;
    const { nombre, direccion, email, telefono } = req.body;

    // Lógica para actualizar el empleado con los nuevos datos
    const haciendaActualizada = await Hacienda.findByIdAndUpdate(
      haciendaId,
      { nombre, direccion, email, telefono },
      { new: true } // Para obtener el empleado actualizado
    );

    console.log("Hacienda actualizada:", haciendaActualizada);
    res.redirect("/haciendas");
  } catch (error) {
    console.error("Error al editar hacienda:", error);
    res.status(500).send("Error interno del servidor");
  }
};