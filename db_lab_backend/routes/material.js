const express = require('express');
const {create, getAll, deleter, update} = require('../controllers/material.js');
const {isAdmin} = require('../middlewares/auth.js');
const {notUpToDate} = require('../middlewares/cache.js');
const router = express.Router();

router.post('/create', isAdmin, notUpToDate, create);
router.get('/getAll', getAll);
router.delete('/delete/:material_Id', isAdmin, notUpToDate, deleter);
router.put('/:material_Id', isAdmin, notUpToDate, update);

module.exports = router;