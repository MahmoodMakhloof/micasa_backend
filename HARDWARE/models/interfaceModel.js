const mongoose = require("mongoose");

const INTERFACE_TYPES = ["DO", "DI", "AO", "AI"]
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



    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("interface", interfaceSchma);