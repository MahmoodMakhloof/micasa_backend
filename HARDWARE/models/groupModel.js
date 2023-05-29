const mongoose = require("mongoose");

const GroupSchma = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    interfaces: [{ type: mongoose.SchemaTypes.ObjectId, ref: "interface" }],
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", GroupSchma);
