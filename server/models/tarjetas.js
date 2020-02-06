const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let tarjetaSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es necesario'],
        unique: true
    },
    text: {
        type: String,
        required: [true, 'El texto es necesario'],
    },
    img: {
        type: String,
        required: [true, 'La imagen es necesaria']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('cards', tarjetaSchema);