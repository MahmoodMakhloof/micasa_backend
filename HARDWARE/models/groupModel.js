const mongoose = require("mongoose");

const groupSchma = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    image: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "groupImage",
    },

    interfaces: [{ type: mongoose.SchemaTypes.ObjectId, ref: "interface" }],
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", groupSchma);
