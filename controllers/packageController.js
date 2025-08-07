const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Create Package
const createPackage = async (req, res) => {
  try {
    const { categoryId, name, description, price, discount, deliveryTime, status } = req.body;
    const newPackage = await prisma.package.create({
      data: {
        categoryId,
        name,
        description,
        price,
        discount,
        deliveryTime,
        status,
      },
    });
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create package.', detail: error.message });
  }
};

// Get All Packages
const getPackages = async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      include: {
        category: true,
        features: true,
        orders: true,
      },
    });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch packages.', detail: error.message });
  }
};

// Get Single Package by ID
const getPackageById = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await prisma.package.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        features: true,
        orders: true,
      },
    });
    if (!found) return res.status(404).json({ error: 'Package not found.' });
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get package.', detail: error.message });
  }
};

// Update Package by Id
const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { categoryId, name, description, price, discount, deliveryTime, status } = req.body;
  try {
    const updated = await prisma.package.update({
      where: { id: Number(id) },
      data: {
        categoryId,
        name,
        description,
        price,
        discount,
        deliveryTime,
        status,
      },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update package.', detail: error.message });
  }
};

// Soft Delete Package 
const deletePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.package.update({
      where: { id: Number(id) },
      data: { status: 'inactive' },
    });
    res.status(200).json({ message: 'Package marked as inactive.', deleted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete package.', detail: error.message });
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
