const Groups = require("../models/groupModel");
const GroupImages = require("../models/groupImageModel");
const Interfaces = require("../models/interfaceModel");

const groupCtrl = {
  addInterfacesToGroup: async (req, res) => {
    try {
      const { interfacesIds, groupId } = req.body;

      const group = await Groups.findOne({
        _id: groupId,
        admin: req.user,
      }).populate("users admin image", "avatar fullname name url");
      if (!group) {
        return res.status(403).json("This group not existed!");
      }

      interfacesIds.forEach((ii) => {
        if (!group.interfaces.find((item) => item._id == ii)) {
          group.interfaces.push(ii);
        }
      });

      const newGroup = await group.save();

      

      return res
        .status(200)
        .json({ msg: "SUCCESS", data: { group: newGroup } });
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
      const { name, image } = req.body;
      const admin = req.user;

      const populatedImage = await GroupImages.findById(image)

      const newGroup = new Groups({
        name,
        image:populatedImage,
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
      const group = await Groups.find({ _id: req.params });
      const user = req.user;
      if (group.admin != user) {
        return res.status(403).json("Permission Denied");
      }

      if (!group) return res.status(400).json({ msg: "No Groups Exists" });
      return res.status(200).json({ data: { group }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserGroups: async (req, res) => {
    try {
      const groups = await Groups.find({
        $or: [{ admin: req.user }, { users: req.user }],
      }).populate("users admin image", "avatar fullname name url");

      return res.status(200).json({ data: { groups }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getGroupInterfaces: async (req, res) => {
    try {
      const group = await Groups.findOne({
        admin: req.user,
        _id: req.params.id,
      });
      console.log(group);
      if (!group) return res.status(400).json("Group Not Existed");
      const interfaces = await Interfaces.find({
        _id: group.interfaces,
      }).populate({
        path: "board",
        populate: {
          path: "model",
        },
      });
      res.status(200).json({ data: { interfaces }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateGroup: async (req, res) => {
    try {
      const { groupId, name, image } = req.body;
      const user = req.user;
      const group = await Groups.findOne({ _id: groupId, admin: req.user });
      if (!group) return res.status(400).json({ msg: "No Groups Exists" });

      if (group.admin._id.toString() != user._id.toString()) {
        return res.status(403).json("Permission Denied");
      }
      const newGroup = await Groups.findOneAndUpdate(
        { _id: groupId },
        {
          name,
          image,
        }
      ).populate("users admin image", "avatar fullname name url");

      return res.json({ msg: "SUCCESS", data: { group: newGroup } });
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

      return res.json({ msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addPic: async (req, res) => {
    try {
      const { name, url } = req.body;
      const image = new GroupImages({
        name,
        url,
      });

      image.save();

      return res.json({ msg: "SUCCESS", data: { image} });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPics: async (req, res) => {
    try {
      const images = await GroupImages.find();
      return res.json({ msg: "SUCCESS", data: { images } });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = groupCtrl;

