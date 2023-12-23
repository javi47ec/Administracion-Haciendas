const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.get('/', animalController.getAllAnimales);
router.get('/nueva', animalController.getNuevoAnimal);
router.post('/nueva', animalController.postNuevoAnimal);
router.get('/:id', animalController.getAnimalDetalle);
router.post('/eliminar/:id', animalController.eliminarAnimal);
router.get('/editar/:id', animalController.getEditarAnimal);
router.post('/editar/:id', animalController.postEditarAnimal); // Agrega esta línea

module.exports = router;
