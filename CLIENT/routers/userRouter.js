const router = require("express").Router();
const auth = require("../../middleware/auth");
const userCtrl = require("../controllers/userController");

router.post("/create", auth, userCtrl.createUser);
router.get("/get", auth, userCtrl.getUserData);
router.patch("/update", auth, userCtrl.updateUser);


module.exports = router;
