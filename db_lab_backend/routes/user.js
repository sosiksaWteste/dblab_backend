const express = require('express');
const {create, getAll, deleter, update, getFromDb} = require('../controllers/user.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.get('/getAll', isAdmin, getAll);
router.delete('/delete/:user_Id', isAdmin, deleter);
router.put('/:user_Id', isAdmin, update);

module.exports = router;