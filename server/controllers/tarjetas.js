const Cards = require('../models/tarjetas.js');
const fs = require('fs');

const controller = 
{
    obtenerTarjetas: function(req, res)
    {


        Cards.find({state: true},"title text img pathimg").exec((err, cards) => 
        {
            if(err)
            {
                return res.status(400).json({ok: false, err})
            }

            res.json({ok: true, cards});

        });

        


    },
    crearTerjeta: (req, res) => 
    {
        let body = req.body;
        let pathArchive = req.file.path;
        let arrayArchive = pathArchive.split('/')
        let nameArchive = arrayArchive[arrayArchive.length - 1];

        let extensionArrayArchive = nameArchive.split('.');
        let extension = extensionArrayArchive[extensionArrayArchive.length - 1];

        if (extension === 'png'||extension === 'jpg'||extension==='gif'||extension==='jpge')
        {
            let card = new Cards({
                title: body.title,
                text: body.text,
                img: nameArchive,
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
            });
        }
        else
        {
            fs.unlink(nameArchivo, (err) => 
            {
                res.json({ok: false});
            })
        }
        
    }
}

module.exports = {controller};