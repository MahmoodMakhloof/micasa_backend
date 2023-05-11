const router = require('express').Router();
const auth = require('../../middleware/auth');
const interfaceCtrl = require('../controllers/interfaceController');


router.get('/get', auth, interfaceCtrl.getUserInterfaces)

module.exports = router;