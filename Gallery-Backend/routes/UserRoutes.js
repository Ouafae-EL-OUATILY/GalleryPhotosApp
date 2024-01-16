const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);
//get user by id
router.get('/user/:userId',userController.getUserbyId);
//get user by pass
router.get('/signIn/password=:password&email=:email',userController.getUserbyPass);

// Update
router.put('/user/:userId', userController.updateUser);

// Delete
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;
