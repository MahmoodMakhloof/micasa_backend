const router = require('express').Router();
const auth = require('../../middleware/auth');
const modelCtrl = require('../controllers/modelController')

router.post('/create', auth, modelCtrl.createModel)
router.get('/:id', auth, modelCtrl.getModelData)
router.patch('/update/:id', auth, modelCtrl.updateModel)

module.exports = router;