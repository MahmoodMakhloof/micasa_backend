const Boards = require("../models/boardModel");
const Interfaces = require("../models/interfaceModel");

const interfaceCtrl = {
  getUserInterfaces: async (req, res) => {
    try {
      const boards = await Boards.find({ admin: req.user._id });
      const interfaces = await Interfaces.find({board:boards});
      res.status(200).json({ data: { interfaces }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = interfaceCtrl;
