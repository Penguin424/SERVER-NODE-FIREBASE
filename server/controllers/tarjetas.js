const Cards = require('../models/tarjetas.js');

const controller = 
{
    obtenerTarjetas: function(req, res)
    {


        Cards.find({state: true},"title text img").exec((err, cards) => 
        {
            if(err)
            {
                return res.status(400).json({ok: false, err})
            }

            res.json({ok: true, cards});

        });

        


    }
}

module.exports = {controller};