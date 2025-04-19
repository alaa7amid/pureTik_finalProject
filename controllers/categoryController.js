const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// إنشاء تصنيف جديد
exports.createCategory = async (req, res) => {
  try {
    const data = req.body;
    const category = await prisma.category.create({ data });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: "فشل إنشاء التصنيف", details: err.message });
  }
};

// عرض كل التصنيفات
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "فشل في جلب التصنيفات" });
  }
};

// عرض تصنيف حسب ID
exports.getCategoryById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: "لم يتم العثور على التصنيف" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "فشل في جلب التصنيف" });
  }
};

// تعديل تصنيف
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
    res.status(400).json({ error: "فشل تعديل التصنيف", details: err.message });
  }
};

// حذف تصنيف
exports.deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.json({ message: "تم حذف التصنيف بنجاح" });
  } catch (err) {
    res.status(400).json({ error: "فشل حذف التصنيف", details: err.message });
  }
};
