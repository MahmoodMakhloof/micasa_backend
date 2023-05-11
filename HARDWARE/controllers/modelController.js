const Models = require("../models/modelModel");

const modelCtrl = {
  createModel: async (req, res) => {
    try {
      var { name, description, map } = req.body;

      const newModel = new Models({
        name,
        description,
        map,
      });

      await newModel.save();

      return res.status(200).json({
        data: {
          model: newModel,
        },
        msg: "SUCCESS",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  getModelData: async (req, res) => {
    try {
      const model = await Models.findOne({ _id: req.params });
      if (!model) return res.status(400).json({ msg: "No Model Exists" });
      res.status(200).json({ data: { model }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateModel: async (req, res) => {
    try {
      const { name, description, map } = req.body;

      const model = await Models.findOneAndUpdate(
        { _id: req.params },
        {
          name,
          description,
          map,
        }
      );

      res.json({ msg: "SUCCESS", data: { model } });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = modelCtrl;
