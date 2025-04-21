const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Validate presence of order items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order items (items) must be provided" });
    }

    let totalPrice = 0;
    const orderItemsData = [];

    // Calculate total price and validate products
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }

      const itemPrice = product.price * item.quantity;
      totalPrice += itemPrice;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,  // Ensure price is taken from the database
      });
    }

    // Create the order
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
            product: true,  // Include product details with each order item
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true, // Include product details with each order item
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
};
