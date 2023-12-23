const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.get('/', empleadoController.getAllEmpleados);
router.get('/nueva', empleadoController.getNuevoEmpleado);
router.post('/nueva', empleadoController.postNuevoEmpleado);
router.get('/:id', empleadoController.getEmpleadoDetalle);
router.post('/eliminar/:id', empleadoController.eliminarEmpleado);
router.get('/editar/:id', empleadoController.getEditarEmpleado);
router.post('/editar/:id', empleadoController.postEditarEmpleado); // Agrega esta línea

module.exports = router;
