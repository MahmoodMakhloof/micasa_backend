const mongoose = require("mongoose");

const GroupSchma = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
      },
    interfaces: [{ type: mongoose.SchemaTypes.ObjectId, ref: "interface" }],

   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", GroupSchma);
