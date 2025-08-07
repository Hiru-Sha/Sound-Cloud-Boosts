const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Create Review
const createReview = async (req, res) => {
  const { rating, comment, firstName, lastName, position } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        firstName,
        lastName,
        position,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review." });
  }
};

// Get all Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};

// Get Review by ID
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    if (!review) return res.status(404).json({ error: "Review not found." });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch review." });
  }
};

// Update Review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment, firstName, lastName, position, status } = req.body;
  try {
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { rating, comment, firstName, lastName, position, status },
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review." });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReview = await prisma.review.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: "Review soft deleted successfully.", review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: "Failed to soft delete review." });
  }
};


module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
