const { Schema, model } = require('mongoose');
const { BinStatus } = require('../enums/EBin');

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
        type: Number
    },
    temperature: {
        type: Number
    },
    gaz: {
        type: Number
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(BinStatus),
        default: BinStatus.PENDING
    }
});

module.exports = model('Bin', binSchema);