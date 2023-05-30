const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enabeld: {
      type: Boolean,
      required: true,
      default: true,
    },
    repeated: {
      type: Boolean,
    },
    days: {
      type: Array,
    },
    time: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    events: { type: Map },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("schedule", scheduleSchema);
