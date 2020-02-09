const Cards = require('../models/tarjetas.js');
const path = require('path');
const {uploadFile, getPublicUrl,dbCreateCard} = require('../conections/conections.js');
const UUID = require("uuid-v4");



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
    crearTerjeta: (req, res, next) => 
    {

      let body = req.body;
      let uuid = UUID();
      const gcsname = Date.now() + req.file.originalname;
      let url = getPublicUrl(gcsname, uuid);

      let card = 
      {
        title: body.title,
        text: body.text,
        img: url
      };

      uploadFile(req,res,next,uuid,gcsname);
      dbCreateCard(card);

      res.status(200).json({
        ok: true,
        cardData: card
      });

      
        
    },
    mandarIMG: (req,res) => 
    {

      let pathImg = ``

      res.sendFile(path.resolve(__dirname + '/../../public/img-1581128480739.png'));
    }
}

module.exports = {controller};