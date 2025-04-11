const express = require('express');
const {create, getAll, deleter} = require('../controllers/developmentDirection.js');
const router = express.Router();

router.post('/create', create);
router.get('/getAll', getAll);
router.post('/delete', deleter);

module.exports = router;