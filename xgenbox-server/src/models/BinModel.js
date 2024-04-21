const { Schema, model } = require('mongoose');

const binSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    gaz: {
        type: Number,
        required: true
    }
});

module.exports = model('Bin', binSchema);