const express = require('express');
const {update, getLastUpdate} = require('../controllers/cache.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/update', isAdmin, update);
router.get('/getLastUpdate', isAdmin, getLastUpdate);

module.exports = router;