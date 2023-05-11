const mongoose = require("mongoose");

/*
    model -> SHCA-4L-22
*/

const modelSchma = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            unique: true
        },

        description: {
            type: String,
            required: true,
        },
        map:{
            type: Array,
            required:true
        }


    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("model", modelSchma);