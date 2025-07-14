const express = require('express');
const router = express.Router();
const {addUser,getAllUsers,claimPoints} = require('../controllers/userController');

router.post('/addUser', addUser);
router.get('/getAllUsers', getAllUsers);
router.post('/claimPoints/:id', claimPoints);

module.exports = router;