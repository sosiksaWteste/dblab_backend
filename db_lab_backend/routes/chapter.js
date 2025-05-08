const express = require('express');
const {create, getAll, deleter, update, getFullFromDb, getFromDb} = require('../controllers/chapter.js');
const {isAdmin} = require('../middlewares/auth.js');
const {notUpToDate} = require('../middlewares/cache.js');
const router = express.Router();

router.post('/create', isAdmin, notUpToDate, create);
router.get('/getAll', getAll);
router.delete('/delete/:chapter_Id', isAdmin, notUpToDate, deleter);
router.put('/:chapter_Id', isAdmin, notUpToDate, update);
router.get('/getFullFromDb', isAdmin, getFullFromDb);
router.get('/getFromDb', isAdmin, getFromDb);

module.exports = router;