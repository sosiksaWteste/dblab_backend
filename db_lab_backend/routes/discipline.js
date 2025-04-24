const express = require('express');
const {create, getAll, deleter, getFull} = require('../controllers/discipline.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.get('/getAll', getAll);
router.post('/delete', isAdmin, deleter);
router.get('/getFull', getFull);

module.exports = router;