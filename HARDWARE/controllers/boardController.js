
const Models = require("../models/modelModel");
const Interfaces = require("../models/interfaceModel");
const Boards = require("../models/boardModel");

const boardCtrl = {
  /// Board has its data like [token] and [model]
  /// After connecting internet , it must post create request
  /// Hardware will request this function or by OEM after finishing physical board

  createBoard: async (req, res) => {
    try {
      var { modelName, token } = req.body;

      var model = await Models.findOne({ name: modelName });
      if (!model) return res.status(400).json({ msg: "model not existed" });

      const newBoard = new Boards({
        name: modelName,
        model: model._id,
        token: token,
      });
      await newBoard.save();

      for (let index = 0; index < model.map.length; index++) {
        const i = model.map[index];
        const newInterface = new Interfaces({
          board: newBoard._id,
          type: i,
          value: null,
          name: i + index,
        });

        await newInterface.save();
      }

      return res.status(200).json({
        msg: "SUCCESS",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  getBoardData: async (req, res) => {
    try {
      const board = await Boards.findOne({ _id: req.params });
      if (!board) return res.status(400).json({ msg: "No Board Exists" });
      res.status(200).json({ data: { board }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserBoards: async (req, res) => {
    try {
      const userBoards = await Boards.find({ admin: res.user });
      res.status(200).json({ data: { userBoards }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = boardCtrl;
