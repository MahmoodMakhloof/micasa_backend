const Boards = require("../models/boardModel");
const Interfaces = require("../models/interfaceModel");
const Groups = require("../models/groupModel");

const interfaceCtrl = {
  getUserInterfaces: async (req, res) => {
    try {
      var interfaces = [];

      const text = req.query.text;
      const groupId = req.query.groupId;
      const boardId = req.query.boardId;

      //required
      // 1- SINGLE_BOARD
      // 2- ALL_BOARDS
      // 3- IN_GROUP
      // 4- TO_GROUP
      const scope = req.query.scope;

      if (scope == "ALL_BOARDS") {
        const boards = await Boards.find({ admin: req.user });
        interfaces = await Interfaces.find({
          board: boards,
          name: { $regex: text },
        }).populate({
          path: "board",
          populate: {
            path: "model",
          },
        });
      } else if (scope == "SINGLE_BOARD") {
        const board = await Boards.findOne({ admin: req.user, _id: boardId });
        if (!board) {
          return res.status(400).json({ msg: "Board Not Existed" });
        }
        interfaces = await Interfaces.find({
          board: board,
          name: { $regex: text },
        }).populate({
          path: "board",
          populate: {
            path: "model",
          },
        });
      } else if (scope == "IN_GROUP") {
        const group = await Groups.findOne({
          admin: req.user,
          _id: groupId,
        });
        if (!group) return res.status(400).json("Group Not Existed");
        interfaces = await Interfaces.find({
          _id: group.interfaces,
          name: { $regex: text },
        }).populate({
          path: "board",
          populate: {
            path: "model",
          },
        });
      } else if (scope == "TO_GROUP") {
        const boards = await Boards.find({ admin: req.user });
        const group = await Groups.findOne({
          admin: req.user,
          _id: groupId,
        });
        if (!group) return res.status(400).json("Group Not Existed");

        interfaces = await Interfaces.find({
          board: boards,
          _id: { $nin: group.interfaces },
          name: { $regex: text },
        }).populate({
          path: "board",
          populate: {
            path: "model",
          },
        });
      }
      res.status(200).json({ data: { interfaces }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getOutputInterfaces: async (req, res) => {
    try {
      var interfacesIds = new Set();

      const myGroups = await Groups.find({
        $or: [{ admin: req.user }, { users: req.user }],
      });

      myGroups.forEach((group) => {
        group.interfaces.forEach((i) => {
          interfacesIds.add(i.toString());
        });
      });

      const myBoards = await Boards.find({ admin: req.user });
      var boardInterfaces = await Interfaces.find({
        board: myBoards,
      }).select("_id");

      boardInterfaces.forEach((i) => {
        interfacesIds.add(i._id.toString());
      });

      interfacesIds = Array.from(interfacesIds);

      var interfaces = await Interfaces.find({
        _id: interfacesIds,
        type: ["DO", "AO"],
      })
        .populate({
          path: "board",
          select: "name",
        })
        .select("name type");

      interfaces = interfaces.map((i) => {
        return {
          interface_id: i._id,
          interface_name: i.name,
          interface_type: i.type,
          interface_board: i.board.name,
        };
      });

      res.status(200).json({ data: { interfaces }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = interfaceCtrl;
