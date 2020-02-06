const express = require('express');
const router = express.Router();
const {controller} = require('../controllers/tarjetas.js');

router.get('/cards', controller.obtenerTarjetas);

module.exports = router;