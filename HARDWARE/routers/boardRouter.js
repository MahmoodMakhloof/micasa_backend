const router = require('express').Router();
const auth = require('../../middleware/auth');
const boardCtrl = require('../controllers/boardController');

/// Device has its date like [token] and [model]
/// After connecting internet , it must post create request
router.post('/create', auth, boardCtrl.createBoard)
router.get('/get', auth, boardCtrl.getBoardData)
router.get('/getUserBoards', auth, boardCtrl.getUserBoards)


module.exports = router;