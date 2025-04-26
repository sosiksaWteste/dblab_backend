const express = require('express');
const {create, getAll, deleter, update} = require('../controllers/language.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.get('/getAll', getAll);
router.delete('/delete/:language_Id', isAdmin, deleter);
router.put('/:language_Id', isAdmin, update);

module.exports = router;