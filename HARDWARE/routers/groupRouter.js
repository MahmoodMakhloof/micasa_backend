const router = require('express').Router();
const auth = require('../../middleware/auth');
const groupCtrl = require('../controllers/groupController');


router.post('/create', auth, groupCtrl.createGroup)
router.get('/:id', auth, groupCtrl.getGroupData)
router.patch('/update/:id', auth, groupCtrl.updateGroup)
router.delete('/delete', auth, groupCtrl.deleteGroup)

router.patch('/add', auth, groupCtrl.addToGroup)
router.patch('/remove', auth, groupCtrl.removeFromGroup)

module.exports = router;