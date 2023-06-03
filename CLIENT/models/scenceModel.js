const mongoose = require("mongoose");

const scenceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    events: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("scence", scenceSchema);
