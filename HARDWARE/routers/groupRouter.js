const router = require('express').Router();
const auth = require('../../middleware/auth');
const groupCtrl = require('../controllers/groupController');


router.post('/create', auth, groupCtrl.createGroup)
router.get('/get/:id', auth, groupCtrl.getGroupData)

router.get('/getUserGroups', auth, groupCtrl.getUserGroups)
router.get('/:id/interfaces', auth, groupCtrl.getGroupInterfaces)
router.patch('/addUser', auth, groupCtrl.addUser)
router.patch('/fireUser', auth, groupCtrl.fireUser)

router.patch('/update', auth, groupCtrl.updateGroup)
router.delete('/delete', auth, groupCtrl.deleteGroup)

router.patch('/add', auth, groupCtrl.addInterfacesToGroup)
router.patch('/remove', auth, groupCtrl.removeInterfaceFromGroup)

//* Pics
router.post('/pics/create', groupCtrl.addPic)
router.get('/pics', groupCtrl.getPics)


module.exports = router;