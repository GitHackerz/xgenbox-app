const { Schema, model } = require('mongoose');
const { BinActionType } = require('../enums/EUser');

const binActionSchema = new Schema({
    bin: {
        type: Schema.Types.ObjectId,
        ref: 'Bin'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: Object.values(BinActionType),
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('BinActions', binActionSchema);