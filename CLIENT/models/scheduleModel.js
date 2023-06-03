const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enabled: {
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
    events: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("schedule", scheduleSchema);
