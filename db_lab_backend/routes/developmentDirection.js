const express = require('express');
const {create, getAll, deleter, update, getRoad} = require('../controllers/developmentDirection.js');
const {isAdmin} = require('../middlewares/auth.js');
const {notUpToDate} = require('../middlewares/cache.js');
const router = express.Router();

router.post('/create', isAdmin, notUpToDate, create);
router.get('/getAll', getAll);
router.delete('/delete/:development_direction_Id', isAdmin, notUpToDate, deleter);
router.put('/:development_direction_Id', isAdmin, notUpToDate, update);
router.get('/getRoad/:development_direction_Id', getRoad);

module.exports = router;