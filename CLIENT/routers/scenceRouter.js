const router = require("express").Router();
const auth = require("../../middleware/auth");
const scenceCtrl = require("../controllers/scenceController");

router.post("/create", auth, scenceCtrl.createNewScence);
router.get("/get", auth, scenceCtrl.getScenceData);
router.get("/getUserScences", auth, scenceCtrl.getUserScences);
router.patch("/update", auth, scenceCtrl.updateScence);
router.delete("/delete", auth, scenceCtrl.deleteScence);


module.exports = router;
