const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};

// Add a new user
const addUser = async (req, res) => {
    const { email, password, username, status } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: "email, password, and username are required." });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                status: status || "active"
            }
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the user." });
    }
};

// Get user by email
const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the user." });
    }
};

// Update user
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { email, password, username, status } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                email,
                password: hashedPassword,
                username,
                status
            }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the user." });
    }
};

// Soft delete user
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                status: "inactive"
            }
        });

        res.json({ message: "User soft deleted successfully.", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while soft deleting the user." });
    }
};


module.exports = {
    getUsers,
    addUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
