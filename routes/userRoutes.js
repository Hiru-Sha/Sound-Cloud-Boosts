const express = require('express');
const router = express.Router();
const {
    getUsers,
    addUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', addUser);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
