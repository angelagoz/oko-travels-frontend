import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/Article.js';

dotenv.config();

const seedArticles = [
  {
    title: 'Cruceros Marítimos por el Caribe',
    slug: 'cruceros-maritimos-caribe',
    description: 'Explora los mejores cruceros por el Caribe, Mediterráneo y costas del mundo.',
    content: 'Contenido completo del artículo sobre cruceros marítimos...',
    category: 'cruceros',
    tags: ['cruceros', 'marítimo', 'caribe'],
    published: true,
    rating: 4.8,
    priceRange: { min: 600, max: 4500, currency: 'USD' },
    bestSeason: 'Diciembre - Marzo',
    travelTips: [
      'Embarque con 2-3 horas de anticipación',
      'Lleva documentos de viaje (pasaporte válido)',
      'Empaca ropa ligera, bloqueador solar y gafas de sol'
    ]
  },
  {
    title: 'Cruceros Fluviales Internacionales',
    slug: 'cruceros-fluviales-internacionales',
    description: 'Navega por ríos europeos como el Danubio, Rin y Loira con lujo y comodidad.',
    content: 'Contenido completo del artículo sobre cruceros fluviales...',
    category: 'cruceros',
    tags: ['cruceros', 'fluvial', 'europa'],
    published: true,
    rating: 4.9,
    priceRange: { min: 2500, max: 25000, currency: 'USD' },
    bestSeason: 'Abril - Octubre',
    travelTips: [
      'Viaja ligero - las cabinas son más compactas',
      'Trae zapatos cómodos para los tours a pie',
      'Usa protección solar'
    ]
  },
  {
    title: 'Punta Cana: Paraíso Dominicano',
    slug: 'punta-cana-paraiso-dominicano',
    description: 'Descubre el paraíso caribeño con playas de arena blanca y resorts all-inclusive.',
    content: 'Contenido completo del artículo sobre Punta Cana...',
    category: 'playas',
    tags: ['punta cana', 'playas', 'dominicana'],
    published: true,
    rating: 4.7,
    priceRange: { min: 600, max: 4000, currency: 'USD' },
    bestSeason: 'Diciembre - Marzo',
    travelTips: [
      'El clima es tropical - lleva ropa ligera',
      'Usa bloqueador solar SPF 50+',
      'Respeta los arrecifes coralinos al bucear'
    ]
  },
  {
    title: 'Viajes a Disney: Magia para Toda la Familia',
    slug: 'viajes-disney-magia-familia',
    description: 'Vive la magia de Disney World Orlando con toda tu familia en el destino perfecto.',
    content: 'Contenido completo del artículo sobre Disney...',
    category: 'parques',
    tags: ['disney', 'parques', 'orlando'],
    published: true,
    rating: 4.9,
    priceRange: { min: 2500, max: 20000, currency: 'USD' },
    bestSeason: 'Enero - Febrero, Septiembre',
    travelTips: [
      'Llega temprano a los parques (apertura)',
      'Come en horarios fuera de pico',
      'Lleva zapatos cómodos'
    ]
  },
  {
    title: 'Las Terrenas: Playas Vírgenes y Aventura',
    slug: 'las-terrenas-playas-virgenes-aventura',
    description: 'Descubre Las Terrenas, el destino bohemio y aventurero con playas salvajes.',
    content: 'Contenido completo del artículo sobre Las Terrenas...',
    category: 'playas',
    tags: ['terrenas', 'playas', 'aventura'],
    published: true,
    rating: 4.6,
    priceRange: { min: 400, max: 5000, currency: 'USD' },
    bestSeason: 'Diciembre - Marzo',
    travelTips: [
      'Las Terrenas es más aventura que lujo',
      'Renta un auto para explorar la península',
      'Lleva dinero en efectivo'
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📍 Conectado a MongoDB');

    // Limpiar artículos anteriores
    await Article.deleteMany({});
    console.log('🗑️ Artículos previos eliminados');

    // Insertar nuevos artículos
    const insertedArticles = await Article.insertMany(seedArticles);
    console.log(`✅ ${insertedArticles.length} artículos insertados exitosamente`);

    // Mostrar información
    const stats = await Article.aggregate([
      { $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }}
    ]);

    console.log('\n📊 Estadísticas por categoría:');
    stats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} artículos (Rating: ${stat.avgRating.toFixed(2)})`);
    });

    mongoose.connection.close();
    console.log('\n✅ Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
