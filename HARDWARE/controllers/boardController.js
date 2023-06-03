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
      var doCtr = 0;
      var aoCtr = 0;
      var diCtr = 0;
      var aiCtr = 0;
      for (let index = 0; index < model.map.length; index++) {
        var interfaceNumber = 0;

        const i = model.map[index];

        if (i == "DO") {
          doCtr++;
          interfaceNumber = doCtr;
        } else if (i == "AO") {
          aoCtr++;
          interfaceNumber = aoCtr;
        } else if (i == "DI") {
          diCtr++;
          interfaceNumber = diCtr;
        } else if (i == "AI") {
          aiCtr++;
          interfaceNumber = aiCtr;
        }
        const newInterface = new Interfaces({
          board: newBoard._id,
          type: i,
          value: null,
          name: i + interfaceNumber,
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
  connectBoard: async (req, res) => {
    try {
      const { token } = req.body;
      const board = await Boards.findOne({ token: token });
      if (!board) return res.status(400).json({ msg: "No Board Exists" });
      if (board.admin != null) {
        if (board.admin._id.toString == req.user._id.toString) {
          return res
            .status(400)
            .json({ msg: "You are connected with this board already!" });
        } else {
          return res.status(400).json({ msg: "This board has admin already!" });
        }
      }
      board.admin = req.user;
      await board.save();
      var newBoard =await  Boards.findOne({ token: token }).populate("model");
      res.status(200).json({ data: { board: newBoard }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  disconnectBoard: async (req, res) => {
    try {
      const { token } = req.body;

      const board = await Boards.findOne({ token: token });
      if (!board) return res.status(400).json({ msg: "No Board Exists" });
      if (board.admin != req.user) {
        return res.status(400).json({ msg: "You are not admin!" });
      }
      board.admin = null;
      var newBoard = await board.save();
      res.status(200).json({ data: { board: newBoard }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserBoards: async (req, res) => {
    try {
      const userBoards = await Boards.find({ admin: req.user }).populate("model");
      res.status(200).json({ data: { boards:userBoards }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = boardCtrl;
