const router = require('express').Router();
const auth = require('../../middleware/auth');
const interfaceCtrl = require('../controllers/interfaceController');


router.get('/getUserInterfaces', auth, interfaceCtrl.getUserInterfaces)
router.get('/getOutputInterfaces', auth, interfaceCtrl.getOutputInterfaces)


module.exports = router;