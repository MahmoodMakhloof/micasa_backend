const mongoose = require("mongoose");

const INTERFACE_TYPES = ["DO", "DI", "AO", "AI"]
const INTERFACE_DEVICES = ["lamp", "fan", "ac", "curtain","lampshade","door","temperature","smoke","lock"]
const interfaceSchma = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        board: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'board',
            required: true,
        },
        type: { type: String, enum: INTERFACE_TYPES },

        value: { type: Number, default: 0 },

        device:{type: String,enum: INTERFACE_DEVICES}

    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("interface", interfaceSchma);