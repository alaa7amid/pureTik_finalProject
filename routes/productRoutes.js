const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);          // إنشاء منتج
router.get('/', productController.getAllProducts);          // كل المنتجات
router.get('/:id', productController.getProductById);       // منتج واحد
router.put('/:id', productController.updateProduct);        // تعديل
router.delete('/:id', productController.deleteProduct);     // حذف
module.exports = router;