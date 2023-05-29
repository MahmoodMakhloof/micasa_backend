const router = require('express').Router();
const auth = require('../../middleware/auth');
const groupCtrl = require('../controllers/groupController');


router.post('/create', auth, groupCtrl.createGroup)
router.get('/:id', auth, groupCtrl.getGroupData)

router.get('/getUserGroups', auth, groupCtrl.getUserGroups)
router.patch('/addUser', auth, groupCtrl.addUser)
router.patch('/fireUser', auth, groupCtrl.fireUser)

router.patch('/update/:id', auth, groupCtrl.updateGroup)
router.delete('/delete', auth, groupCtrl.deleteGroup)

router.patch('/add', auth, groupCtrl.addInterfaceToGroup)
router.patch('/remove', auth, groupCtrl.removeInterfaceFromGroup)


module.exports = router;