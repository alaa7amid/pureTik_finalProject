const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ إضافة منتج جديد
exports.createProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({ data });
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ خطأ في إنشاء المنتج:", err);
    res.status(500).json({ error: "فشل إنشاء المنتج", details: err.message });
  }
};

// ✅ عرض كل المنتجات
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true // لو حاب تعرض معلومات التصنيف مع كل منتج
      }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "فشل جلب المنتجات" });
  }
};

// ✅ عرض منتج واحد
exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!product) return res.status(404).json({ error: "المنتج غير موجود" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "فشل جلب المنتج" });
  }
};

// ✅ تعديل منتج
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
    res.status(500).json({ error: "فشل تحديث المنتج" });
  }
};

// ✅ حذف منتج
exports.deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: "تم حذف المنتج بنجاح" });
  } catch (err) {
    res.status(500).json({ error: "فشل حذف المنتج" });
  }
};
