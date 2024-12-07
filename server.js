import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Database Connection
(async () => {
  try {
    await connectDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
})();

// Cloudinary Connection
(async () => {
  try {
    await connectCloudinary();
    console.log('Cloudinary connected successfully');
  } catch (error) {
    console.error('Cloudinary connection failed:', error.message);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root Route
app.get('/', (req, res) => {
  res.status(200).send('API Working');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send({ error: 'Internal Server Error' });
});

app.use((req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

// Start the Server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});