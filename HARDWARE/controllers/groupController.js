const Groups = require("../models/groupModel");

const groupCtrl = {
  addInterfaceToGroup: async (req, res) => {
    try {
      const { interfaceId, groupId } = req.body;
      const user = req.user;
      const group = await Groups.findById(groupId);
      if (group.admin != user) {
        return res.status(403).json("Permission Denied");
      }

      if (group.interfaces.some((i) => i._id === interfaceId)) {
        return res.status(208).json("Already Added");
      }
      const newGroup = await Groups.updateOne(
        { _id: groupId },
        {
          $push: { interfaces: interfaceId },
        }
      );

      return res.status(200).json({ msg: "SUCCESS", data: { newGroup } });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  addUser: async (req, res) => {
    try {
      const { userId, groupId } = req.body;
      const group = await Groups.findById(groupId);
      if (group.admin != req.user) {
        return res.status(403).json("Permission Denied");
      }

      if (group.users.some((i) => i._id === userId)) {
        return res.status(208).json("Already Added");
      }
      const newGroup = await Groups.updateOne(
        { _id: groupId },
        {
          $push: { users: userId },
        }
      );

      return res.status(200).json({ msg: "SUCCESS", data: { newGroup } });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },
  removeInterfaceFromGroup: async (req, res) => {
    try {
      const { interfaceId, groupId } = req.body;
      const user = req.user;
      const group = await Groups.findById(groupId);
      if (group.admin != user) {
        return res.status(403).json("Permission Denied");
      }

      if (group.interfaces.some((i) => i._id === interfaceId)) {
        const newGroup = await Groups.updateOne(
          { _id: groupId },
          {
            $pop: { interfaces: interfaceId },
          }
        );

        return res.status(200).json({ msg: "SUCCESS", data: { newGroup } });
      }
      return res.status(400).json("Interface Not Existed In The Group");
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  fireUser: async (req, res) => {
    try {
      const { userId, groupId } = req.body;
      const group = await Groups.findById(groupId);
      if (group.admin != req.user) {
        return res.status(403).json("Permission Denied");
      }

      if (group.users.some((i) => i._id === userId)) {
        const newGroup = await Groups.updateOne(
          { _id: groupId },
          {
            $pop: { users: userId },
          }
        );

        return res.status(200).json({ msg: "SUCCESS", data: { newGroup } });
      }
      return res.status(400).json("Interface Not Existed In The Group");
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },
  createGroup: async (req, res) => {
    try {
      const { name } = req.body;
      const admin = req.user;

      const newGroup = new Groups({
        name,
        admin,
      });

      await newGroup.save();

      return res.status(200).json({
        data: {
          group: newGroup,
        },
        msg: "SUCCESS",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  getGroupData: async (req, res) => {
    try {
      const group = await Groups.findOne({ _id: req.params });
      const user = req.user;
      if (group.admin != user) {
        return res.status(403).json("Permission Denied");
      }

      if (!group) return res.status(400).json({ msg: "No Groups Exists" });
      res.status(200).json({ data: { group }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserGroups: async (req, res) => {
    try {
      const groups = await Groups.find({
        $or: [{ admin: req.user }, { users: req.user }],
      });

      res.status(200).json({ data: { groups }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateGroup: async (req, res) => {
    try {
      const { name } = req.body;
      const user = req.user;
      const group = await Groups.findOne({ _id: req.params });
      if (!group) return res.status(400).json({ msg: "No Groups Exists" });

      if (group.admin != user) {
        return res.status(403).json("Permission Denied");
      }
      const newGroup = await Groups.findOneAndUpdate(
        { _id: req.params },
        {
          name,
        }
      );

      res.json({ msg: "SUCCESS", data: { newGroup } });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteGroup: async (req, res) => {
    try {
      const user = req.user;
      const group = await Groups.findOne({ _id: req.params });
      if (!group) return res.status(400).json({ msg: "No Groups Exists" });

      if (group.admin != user) {
        return res.status(403).json("Permission Denied");
      }
      await Groups.deleteOne({ _id: req.params });

      res.json({ msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = groupCtrl;
