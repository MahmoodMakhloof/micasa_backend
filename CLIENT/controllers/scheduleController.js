const Schedules = require("../models/scheduleModel");

const scheduleCtrl = {
  createNewSchedule: async (req, res) => {
    try {
      var { name, cron, events,  } = req.body;

      const newSchedule = new Schedules({
        user: req.user,
        name,
        events,
        cron
      });

      await newSchedule.save();

      return res.status(200).json({
        data: {
          schedule: newSchedule,
        },
        msg: "SUCCESS",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  getScheduleData: async (req, res) => {
    try {
      const schedule = await Schedules.findOne({ _id: req.body.scheduleId });
      if (!schedule) return res.status(400).json({ msg: "No schedule Exists" });
      res.status(200).json({ data: { schedule }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateSchedule: async (req, res) => {
    try {
        var { name,enabled, cron, events,  } = req.body;

      const schedule = await Schedules.findOneAndUpdate(
        { _id: req.body.scheduleId },
        {
          name,
          enabled,
          cron,
          events,
        }
      );

      res.json({ msg: "SUCCESS", data: { schedule } });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const schedule = await Schedules.findOne({ _id: req.body.scheduleId });
      if (!schedule)
        return res.status(400).json({ msg: "Schedule Not Existed" });
      await Schedules.deleteOne({ _id: req.body.scheduleId });
      res.status(200).json({ msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserSchedules: async (req, res) => {
    try {
      const schedules = await Schedules.find({
        user: req.user
      });

      res.status(200).json({ data: { schedules }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = scheduleCtrl;
