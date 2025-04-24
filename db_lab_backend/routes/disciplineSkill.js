const express = require('express');
const {create, getAll, deleter} = require('../controllers/disciplineSkill.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.get('/getAll', getAll);
router.post('/delete', isAdmin, deleter);

module.exports = router;