const mongoose = require("mongoose");

const BoardSchma = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        token:{
            type:String,
            required: true,
            unique: true
        },
        model: {
            type: mongoose.SchemaTypes.ObjectId, ref: 'model',
            required: true,
        },
        admin: {
            type: mongoose.SchemaTypes.ObjectId, ref: 'user',
        },
        

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("board", BoardSchma);