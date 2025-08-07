const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByEmail
} = require('../controllers/orderController');


router.get('/email/:email', getOrdersByEmail);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
