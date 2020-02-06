const express = require('express');
const router = express.Router();
const {controller} = require('../controllers/tarjetas.js');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, __dirname + '/../../public')
    },
    filename: (req, file, cb)=>
    {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage});

router.get('/cards', controller.obtenerTarjetas);
router.post('/cards', upload.single('img') , controller.crearTerjeta);

module.exports = router;