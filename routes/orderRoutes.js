const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// إنشاء طلب جديد
router.post('/', orderController.createOrder);

// جلب كل الطلبات الخاصة بمستخدم معيّن
router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;
