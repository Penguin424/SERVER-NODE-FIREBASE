const express = require('express');
const router = express.Router();
const {controller} = require('../controllers/tarjetas.js');

const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({storage});

router.get('/cards', controller.obtenerTarjetas);
router.post('/cards', upload.single('img') , controller.crearTerjeta);
router.get('/prueba', controller.mandarIMG);

module.exports = router;