const router = require("express").Router();
const auth = require("../../middleware/auth");
const scheduleCtrl = require("../controllers/scheduleController");

router.post("/create", auth, scheduleCtrl.createNewSchedule);
router.get("/get", auth, scheduleCtrl.getScheduleData);
router.get("/getUserSchedules", auth, scheduleCtrl.getUserSchedules);
router.patch("/update", auth, scheduleCtrl.updateSchedule);
router.delete("/delete", auth, scheduleCtrl.deleteSchedule);


module.exports = router;
