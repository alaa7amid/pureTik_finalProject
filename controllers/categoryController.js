const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const data = req.body;
    const category = await prisma.category.create({ data });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: "Failed to create category", details: err.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const category = await prisma.category.update({
      where: { id },
      data
    });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: "Failed to update category", details: err.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete category", details: err.message });
  }
};
