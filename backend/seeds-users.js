import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedUsers = [
  {
    name: 'Admin OKO TRAVELS',
    email: 'admin@oko.com',
    password: 'Admin123!',
    role: 'admin',
    isActive: true
  },
  {
    name: 'Editor CMS',
    email: 'editor@oko.com',
    password: 'Editor123!',
    role: 'editor',
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📍 Conectado a MongoDB');

    // Limpiar usuarios anteriores
    await User.deleteMany({});
    console.log('🗑️ Usuarios previos eliminados');

    // Insertar nuevos usuarios
    const insertedUsers = await User.insertMany(seedUsers);
    console.log(`✅ ${insertedUsers.length} usuarios insertados exitosamente`);

    // Mostrar información
    console.log('\n👥 Usuarios creados:');
    insertedUsers.forEach(user => {
      console.log(`  • ${user.name} (${user.email}) - Rol: ${user.role}`);
    });

    mongoose.connection.close();
    console.log('\n✅ Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
