require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const routers = require('./routes/routes.js');
const uploads = require('./controllers/terjetasimg.js');
const corsOptions = {origin: '*'};

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use('/api',cors(corsOptions),routers);
app.use('/api',cors(corsOptions),uploads);

app.listen(process.env.PORT, (e) => {
    if(e)
    {
        console.log(e);
    }

    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);

});

mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (e) => {

    if(e) throw e;

    console.log('Base de datos conectada');


});


// Parametros recomentados para por mongoose
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false)