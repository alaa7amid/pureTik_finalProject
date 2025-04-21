const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Create a new product
exports.createProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({ data });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ error: "Failed to create product", details: err.message });
  }
};

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true // If you want to include category info with each product
      }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ Get a single product
exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// ✅ Update a product
exports.updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updated = await prisma.product.update({
      where: { id },
      data
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// ✅ Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
