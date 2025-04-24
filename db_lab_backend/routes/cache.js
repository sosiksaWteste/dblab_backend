const express = require('express');
const {update} = require('../controllers/cache.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/update', isAdmin, update);

module.exports = router;