
    const express = require('express');
    const router = express.Router();
    const maquinariaController = require('../controllers/maquinariaController');

    router.get('/', maquinariaController.getAllMaquinarias);
    router.get('/nueva', maquinariaController.showNewForm);
    router.post('/nueva', maquinariaController.createMaquinaria);
    router.get('/:id', maquinariaController.getMaquinariaDetalle);
    router.get('/editar/:id', maquinariaController.showEditForm);
    router.post('/editar/:id', maquinariaController.updateMaquinaria);
    router.post('/eliminar/:id', maquinariaController.deleteMaquinaria);
    


    module.exports = router;