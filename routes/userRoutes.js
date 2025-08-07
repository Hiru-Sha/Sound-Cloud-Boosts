const express = require('express');
const router = express.Router();
const {
    getUsers,
    addUser,
    loginUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const verifyToken = require('../middleware/authMiddleware'); 

router.get('/', verifyToken, getUsers); 
router.post('/', addUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
