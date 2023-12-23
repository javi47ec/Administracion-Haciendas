// routes/haciendaRouter.js
const express = require('express');
const router = express.Router();
const haciendaController = require('../controllers/haciendaController');

router.get('/', haciendaController.getAllHaciendas);
router.get('/nueva', haciendaController.getNuevaHacienda);
router.post('/nueva', haciendaController.postNuevaHacienda);
router.get('/:id', haciendaController.getHaciendaDetalle);
router.post('/eliminar/:id', haciendaController.eliminarHacienda);
router.get('/editar/:id', haciendaController.getEditarHacienda);
router.post('/editar/:id', haciendaController.postEditarHacienda);

module.exports = router;
