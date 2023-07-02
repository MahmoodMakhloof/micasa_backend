const Scences = require("../models/scenceModel");
const scenceCtrl = {
  createNewScence: async (req, res) => {
    try {
      var { name,  events } = req.body;

      const newScence = new Scences({
        user: req.user,
        name,
        events,
      });

      await newScence.save();

      return res.status(200).json({
        data: {
          scence: newScence,
        },
        msg: "SUCCESS",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  getScenceData: async (req, res) => {
    try {
      const scence = await Scences.findOne({ _id: req.body.scenceId });
      if (!scence) return res.status(400).json({ msg: "No scence Exists" });
      res.status(200).json({ data: { scence }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateScence: async (req, res) => {
    try {
      const { name , events } = req.body;

      const scence = await Scences.findOneAndUpdate(
        { _id: req.body.scenceId },
        {
          name,
          events,
        }
      );

      res.json({ msg: "SUCCESS", data: { scence } });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteScence: async (req, res) => {
    try {
      const scence = await Scences.findOne({ _id: req.body.scenceId });
      if (!scence) return res.status(400).json({ msg: "Scence Not Existed" });
      await Scences.deleteOne({ _id: req.body.scenceId });
      res.status(200).json({ msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserScences: async (req, res) => {
    try {
      const scences = await Scences.find({
        user: req.user
      });

      res.status(200).json({ data: { scences }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = scenceCtrl;
