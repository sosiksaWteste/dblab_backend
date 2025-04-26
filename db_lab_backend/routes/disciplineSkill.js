const express = require('express');
const {create, getAll, deleter, update} = require('../controllers/disciplineSkill.js');
const {isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.get('/getAll', getAll);
router.delete('/delete/:disciplineSkill_Id', isAdmin, deleter);
router.put('/:disciplineSkill_Id', isAdmin, update);

module.exports = router;