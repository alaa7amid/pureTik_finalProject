const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('🎉 السيرفر شغال، جرب تروح إلى /data/users');
  });
  
const PORT = process.env.PORT || 5000;
app.listen(3000, () => console.log("✅ Server running on port 3000"));
