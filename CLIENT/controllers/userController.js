const Users = require("../models/userModel");

const userCtrl = {
  createUser: async (req, res) => {
    try {
      var { fullname, email, avatar } = req.body;

      const newUser = new Users({
        fullname,
        email,
        avatar,
      });

      await newUser.save();

      return res.status(200).json({
        data: {
          user: newUser,
        },
        msg: "SUCCESS",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.toString() });
    }
  },

  getUserData: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user._id });
      if (!user) return res.status(400).json({ msg: "No user Exists" });
      res.status(200).json({ data: { user }, msg: "SUCCESS" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { fullname, phone, address } = req.body;

      const user = await Users.findOneAndUpdate(
        { _id: req.body._id },
        {
          fullname,
          phone,
          address,
        }
      );

      res.json({ msg: "SUCCESS", data: { user } });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

 

  
};

module.exports = userCtrl;
