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
    
    cron: {
      type: String,
    },
    datetime: {
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
