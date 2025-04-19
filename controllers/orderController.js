const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// إنشاء طلب جديد
exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // تحقق من صحة وجود العناصر في الطلب
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "يجب إرسال عناصر الطلب (items)" });
    }

    let totalPrice = 0;
    const orderItemsData = [];

    // نحسب السعر الكلي ونتحقق من وجود المنتج
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res.status(404).json({ error: `المنتج بالمعرف ${item.productId} غير موجود` });
      }

      const itemPrice = product.price * item.quantity;
      totalPrice += itemPrice;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,  // التأكد من استخدام السعر من قاعدة البيانات
      });
    }

    // إنشاء الطلب
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,  // لنتمكن من استعراض المنتجات مع الطلبات
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'فشل إنشاء الطلب', details: error.message });
  }
};

// جلب الطلبات لمستخدم معيّن
exports.getUserOrders = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true, // جلب المنتج مع كل عنصر من عناصر الطلب
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'فشل جلب الطلبات', details: error.message });
  }
};
