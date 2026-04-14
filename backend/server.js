import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import articlesRoutes from './routes/articles.js';
import usersRoutes from './routes/users.js';
import subscribersRoutes from './routes/subscribers.js';

// Load environment variables
dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== DATABASE CONNECTION =====
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando MongoDB:', error.message);
    process.exit(1);
  }
};

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ Server Running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Welcome route
app.get('/api', (req, res) => {
  res.json({
    message: '🌍 Bienvenido a OKO TRAVELS API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      blog: '/api/articles',
      auth: '/api/auth',
      newsletter: '/api/subscribers'
    }
  });
});

// API Routes
app.use('/api/articles', articlesRoutes);
app.use('/api/auth', usersRoutes);
app.use('/api/subscribers', subscribersRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.originalUrl
  });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🚀 OKO TRAVELS BACKEND RUNNING       ║
║   Port: ${PORT}
║   Env: ${process.env.NODE_ENV}
║   MongoDB: ✅ Connected              ║
╚════════════════════════════════════════╝
    `);
  });
};

startServer();

export default app;
