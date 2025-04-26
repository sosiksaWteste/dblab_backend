const express = require('express');
const {create, getAll, deleter, update} = require('../controllers/level.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.get('/getAll', getAll);
router.delete('/delete/:level_Id', isAdmin, deleter);
router.put('/:level_Id', isAdmin, update);

module.exports = router;