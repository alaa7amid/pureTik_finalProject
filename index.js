const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
dotenv.config();

const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('🎉 السيرفر شغال، جرب تروح إلى /data/users');
  });
  

  const userRoutes = require('./routes/userRoutes');
  app.use('/api/users', userRoutes);
   
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(3000, () => console.log("✅ Server running on port 3000"));
