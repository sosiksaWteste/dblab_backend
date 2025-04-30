const express = require('express');
const {create, getAll, deleter, getFull, update, getFullId} = require('../controllers/discipline.js');
const {isAdmin} = require('../middlewares/auth.js');
const {notUpToDate} = require('../middlewares/cache.js');
const router = express.Router();

router.post('/create', isAdmin, notUpToDate, create);
router.get('/getAll', getAll);
router.delete('/delete/:discipline_Id', isAdmin, notUpToDate, deleter);
router.get('/getFull', getFull);
router.put('/:discipline_Id', isAdmin, notUpToDate, update);
router.get('/getFull/:discipline_Id', getFullId);

module.exports = router;