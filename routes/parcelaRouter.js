const express = require('express');
const router = express.Router();
const parcelaController = require('../controllers/parcelaController');

router.get('/', parcelaController.getAllParcelas);
router.get('/nueva', parcelaController.getNuevaParcela);
router.post('/nueva', parcelaController.postNuevaParcela);
router.get('/:id', parcelaController.getParcelaDetalle);
router.post('/eliminar/:id', parcelaController.eliminarParcela);
router.get('/editar/:id', parcelaController.getEditarParcela);
router.post('/editar/:id', parcelaController.postEditarParcela); // Agrega esta línea

module.exports = router;