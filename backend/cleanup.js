import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/Article.js';

dotenv.config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📍 Conectado a MongoDB');

    // Eliminar la colección completa
    await Article.collection.deleteMany({});
    console.log('🗑️ Colección de artículos eliminada');

    // Eliminar índices
    await Article.collection.dropIndexes();
    console.log('🔑 Índices eliminados');

    console.log('✅ Limpieza completada');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

cleanup();
