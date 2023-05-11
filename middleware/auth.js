const Users = require("../CLIENT/models/userModel");
var admin = require("firebase-admin");

var serviceAccount = require("../shca-89db8-firebase-adminsdk-zrz5j-aaaff340b2.json");
adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Required" });
    const decoded = await admin.auth().verifyIdToken(token);

    const user = await Users.findOne({ email: decoded.email });
    if (user) {
      req.user = user;
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
