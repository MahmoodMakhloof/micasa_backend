const mongoose = require("mongoose");

const groupImageSchma = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("groupImage", groupImageSchma);
