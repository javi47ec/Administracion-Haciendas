const express = require('express');
const router = express.Router();
const cultivoController = require('../controllers/cultivoController');

router.get('/', cultivoController.getAllCultivos);
router.get('/nueva', cultivoController.getNuevoCultivo);
router.post('/nueva', cultivoController.postNuevoCultivo);
router.get('/:id', cultivoController.getCultivoDetalle);
//router.post('/eliminar/:id', cultivoController.eliminarCultivo);
router.get('/editar/:id', cultivoController.getEditarCultivo);
router.post('/editar/:id', cultivoController.postEditarCultivo); // Agrega esta línea

module.exports = router;