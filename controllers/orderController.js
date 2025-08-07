const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Create new order
const createOrder = async (req, res) => {
    const { packageId, email, url, quantity, totalPrice, status } = req.body;

    try {
        const newOrder = await prisma.order.create({
            data: {
                packageId,
                email,
                url,
                quantity,
                totalPrice,
                status,
            },
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                package: true, 
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    const orderId = parseInt(req.params.id);

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { package: true },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the order.' });
    }
};
//get orders by Email
const getOrdersByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: { email },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders for this email." });
    }
};


// Update order
const updateOrder = async (req, res) => {
    const orderId = parseInt(req.params.id);
    const { packageId, email, url, quantity, totalPrice, status } = req.body;

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                packageId,
                email,
                url,
                quantity,
                totalPrice,
                status,
            },
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the order.' });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    const orderId = parseInt(req.params.id);
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: "inactive" },
        });
        res.json({ message: "Order deleted." });
    } catch (error) {
        res.status(500).json({ error: "Error deleting order." });
    }
};


module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    getOrdersByEmail,
    updateOrder,
    deleteOrder,
};
