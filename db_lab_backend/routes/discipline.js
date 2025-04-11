const express = require('express');
const {create, getAll, deleter, getFull} = require('../controllers/discipline.js');
const router = express.Router();

router.post('/create', create);
router.get('/getAll', getAll);
router.post('/delete', deleter);
router.get('/getFull', getFull);

module.exports = router;