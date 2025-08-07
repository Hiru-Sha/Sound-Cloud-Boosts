const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Create a new system info
const createSystemInfo = async (req, res) => {
  const { name, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const systemInfo = await prisma.systemInfo.create({
      data: { name, description, imageUrl },
    });
    res.status(201).json(systemInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create system info." });
  }
};

// Get all system info entries
const getSystemInfos = async (req, res) => {
  try {
    const infos = await prisma.systemInfo.findMany();
    res.status(200).json(infos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch system info." });
  }
};

// Get system info by ID
const getSystemInfoById = async (req, res) => {
  const { id } = req.params;
  try {
    const info = await prisma.systemInfo.findUnique({
      where: { id: parseInt(id) },
    });
    if (!info) return res.status(404).json({ error: "System info not found." });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch system info." });
  }
};

// Update system info
const updateSystemInfo = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updatedInfo = await prisma.systemInfo.update({
      where: { id: parseInt(id) },
      data: { name, description, imageUrl },
    });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update system info." });
  }
};

// Soft delete system info 
const deleteSystemInfo = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.systemInfo.update({
      where: { id: parseInt(id) },
      data: { status: "inactive" }, 
    });

    res.status(200).json({ message: "System info soft-deleted successfully." });
  } catch (error) {
    console.error("Error in soft deleting system info:", error);
    res.status(500).json({ error: "Failed to soft delete system info." });
  }
};

module.exports = {
  createSystemInfo,
  getSystemInfos,
  getSystemInfoById,
  updateSystemInfo,
  deleteSystemInfo,
};
