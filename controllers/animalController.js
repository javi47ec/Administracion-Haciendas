const Animal = require("../models/animalModel");
const Hacienda = require("../models/haciendaModel");

exports.getAllAnimales = async (req, res) => {
  const animales = await Animal.find().populate('hacienda');
  res.render("animales/index", { animales });
};

exports.getNuevoAnimal = async (req, res) => {
  const haciendas = await Hacienda.find();
  const animal = { sexo: 'Macho' }; // Cambia esto según tus necesidades

  // Obtén tus datos de haciendas aquí, supongamos que son almacenados en la variable "haciendas"

  res.render('animales/nueva', { animal, haciendas });
}

exports.postNuevoAnimal = async (req, res) => {
  try {
    const { nombre, fechaNacimiento, raza, sexo, estado, observaciones, haciendaId } = req.body;

    const animal = new Animal({
      nombre,
      fechaNacimiento,
      raza,
      sexo,
      observaciones,
      estado,
      hacienda: haciendaId, // Asigna la hacienda al animal
    });

    await animal.save();
    console.log('Nuevo Animal Creado', animal);
    res.redirect("/animales");
  } catch (error) {
    console.error('Error al crear un nuevo animal:', error);
    res.status(500).send('Error interno del servidor');
  }
};


exports.getAnimalDetalle = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    const haciendas = await Hacienda.find(); 
    res.render("animales/detalle", { animal, haciendas }); 
  } catch (error) {
    console.error('Error al obtener el detalle de un animal:', error);
    res.status(500).send('Error interno del servidor');
  }
};
exports.eliminarAnimal = async (req, res) => {
  await Animal.findByIdAndDelete(req.params.id);
  res.redirect("/animales");
}

exports.getEditarAnimal = async (req, res) => {
  const haciendas = await Hacienda.find();
  const animal = await Animal.findById(req.params.id).populate('hacienda');
  console.log('Haciendas', haciendas);
  console.log('Animal con hacienda', animal);
  res.render("animales/editar", { animal, haciendas });
}

exports.postEditarAnimal = async (req, res) => {
  try {
    const animalId = req.params.id;
    const { nombre, fechaNacimiento, raza, sexo, estado, observaciones, haciendaId } = req.body;

    const animalActualizado = await Animal.findByIdAndUpdate(
      animalId,
      {
        nombre,
        fechaNacimiento,
        raza,
        sexo,
        observaciones,
        estado,
        hacienda: haciendaId, // Actualiza la hacienda del animal
      },
      { new: true }
    );

    console.log('Animal actualizado:', animalActualizado);
    res.redirect('/animales');
  } catch (error) {
    console.error('Error al editar animal:', error);
    res.status(500).send('Error interno del servidor');
  }
};

