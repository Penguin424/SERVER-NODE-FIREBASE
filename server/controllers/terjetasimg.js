const Cards = require('../models/tarjetas.js');
const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const multipartyMiddleWare = multipart({uploadDir: __dirname + '/../uploads'});
const fs = require('fs');


app.post('/cards',multipartyMiddleWare,(req, res) =>
{

    let body = req.body;
    let nameArchivo = req.files.img.path;
    let cortadoArchivo = nameArchivo.split('/');
    let cortadoDeExtension = cortadoArchivo[cortadoArchivo.length - 1].split('.');
    let extension = cortadoDeExtension[cortadoDeExtension.length - 1];

    if (extension === 'png'||extension === 'jpg'||extension==='gif'||extension==='jpge') 
    {
        let nombreArchivo = `${ cortadoDeExtension[0] }-${ new Date().getMilliseconds() }.${ extension }`

 


        let card = new Cards({
            title: body.title,
            text: body.text,
            img: nombreArchivo
        });
        
            
        
        card.save((err, card) => {
            if(err)
            {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        
            res.json({
                ok: true,
                card: card
            });
        })
    }
    else
    {
        fs.unlink(nameArchivo, (err) => 
        {
            res.json({ok: false});
        })
    }






});

module.exports = app;