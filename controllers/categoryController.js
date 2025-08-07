const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                packages: true,
            },
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching categories." });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    const categoryId = parseInt(req.params.id);

    try {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: "Category not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the category." });
    }
};

// Create new category
const addCategory = async (req, res) => {
    const { name, description, status } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name) {
        return res.status(400).json({ error: "Category name is required." });
    }

    try {
        const existing = await prisma.category.findUnique({ where: { name } });

        if (existing) {
            return res.status(400).json({ error: "Category with this name already exists." });
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                description,
                imageUrl,
                status: status || "active",
            },
        });

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the category." });
    }
};

// Update category
const updateCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name, description, status } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;


    try {
        const updated = await prisma.category.update({
            where: { id: categoryId },
            data: {
                name,
                description,
                imageUrl,
                status,
            },
        });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the category." });
    }
};

// Soft delete category
const deleteCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id);

    try {
        const updated = await prisma.category.update({
            where: { id: categoryId },
            data: {
                status: "inactive",
            },
        });

        res.json({ message: "Category soft-deleted successfully.", category: updated });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while soft-deleting the category." });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
};
