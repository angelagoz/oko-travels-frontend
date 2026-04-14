# 🌍 OKO TRAVELS - Backend API

Backend profesional para la agencia de viajes OKO TRAVELS.

## 🚀 Características

- ✅ API REST con Express.js
- ✅ Base de datos MongoDB Atlas
- ✅ Autenticación JWT
- ✅ Panel CMS para gestionar artículos
- ✅ Sistema de usuarios y roles
- ✅ Gestión de imágenes con Cloudinary
- ✅ Newsletter/Suscripción

## 📋 Requisitos Previos

- Node.js 16+
- MongoDB Atlas (cuenta gratuita)
- Cloudinary (opcional, para subida de imágenes)

## 🛠️ Instalación

### 1. Clonar repositorio
```bash
git clone <tu-repo>
cd backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear archivo .env
```bash
cp .env.example .env
```

### 4. Configurar MongoDB Atlas

1. Ir a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cuenta gratuita
3. Crear cluster (elegir región cercana)
4. Obtener connection string
5. Pegar en `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/oko_travels
```

### 5. Configurar variables de entorno

Editar `.env` con:
```env
MONGODB_URI=tu_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=tu_secreto_super_seguro
CORS_ORIGIN=http://localhost:3000
```

### 6. Ejecutar servidor

**Desarrollo (con hot reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

## 📚 Estructura del Proyecto

```
backend/
├── server.js          # Servidor principal
├── package.json       # Dependencias
├── .env              # Variables de entorno
├── models/           # Esquemas MongoDB
│   ├── Article.js    # Modelo de artículos
│   ├── User.js       # Modelo de usuarios
│   └── Subscriber.js # Modelo de suscriptores
├── routes/           # Rutas API (próximamente)
├── controllers/      # Lógica de negocio (próximamente)
├── config/           # Configuración (próximamente)
└── README.md         # Este archivo
```

## 🔌 Modelos de Base de Datos

### Article
- `title`: Título del artículo
- `description`: Descripción corta
- `content`: Contenido completo
- `category`: Categoría (cruceros, playas, parques, etc)
- `featuredImage`: URL de imagen principal
- `gallery`: Array de imágenes
- `priceRange`: Rango de precios
- `travelTips`: Consejos de viaje

### User
- `name`: Nombre completo
- `email`: Email único
- `password`: Contraseña hasheada
- `role`: Rol (user, admin, editor)
- `preferences`: Preferencias del usuario

### Subscriber
- `email`: Email del suscriptor
- `interests`: Intereses de viaje
- `status`: Estado (active, inactive, unsubscribed)
- `isConfirmed`: Email confirmado

## 🔐 Seguridad

✅ Passwords hasheados con bcryptjs
✅ JWT para autenticación
✅ CORS configurado
✅ Variables de entorno protegidas
✅ Validación de datos

## 🔌 API Endpoints

### Blog (Artículos)
```
GET    /api/articles              # Obtener todos los artículos
GET    /api/articles/:id          # Obtener artículo por ID o slug
POST   /api/articles              # Crear nuevo artículo
PUT    /api/articles/:id          # Actualizar artículo
DELETE /api/articles/:id          # Eliminar artículo
GET    /api/articles/stats/categories  # Estadísticas
```

### Autenticación (Usuarios)
```
POST   /api/auth/register         # Registrar nuevo usuario
POST   /api/auth/login            # Login
GET    /api/auth/profile/:id      # Obtener perfil
PUT    /api/auth/profile/:id      # Actualizar perfil
POST   /api/auth/change-password/:id  # Cambiar contraseña
DELETE /api/auth/account/:id      # Eliminar cuenta
```

### Newsletter (Suscriptores)
```
POST   /api/subscribers/subscribe  # Suscribirse
POST   /api/subscribers/unsubscribe/:email  # Desuscribirse
PUT    /api/subscribers/preferences/:email  # Actualizar preferencias
GET    /api/subscribers/stats/overview      # Estadísticas (admin)
GET    /api/subscribers/list      # Lista de suscriptores (admin)
```

## 🌱 Poblar Base de Datos

Para insertar datos de ejemplo:
```bash
node seeds.js
```

Esto creará 5 artículos de ejemplo con categorías y datos realistas.

## 📞 Próximos Pasos

1. ✅ Setup del servidor
2. ✅ API endpoints (CRUD para artículos)
3. ✅ Autenticación y usuarios
4. ⏳ Panel CMS visual
5. ⏳ Deploy en Vercel Functions

## 🤝 Contribuidores

OKO TRAVELS Team

## 📄 Licencia

MIT
