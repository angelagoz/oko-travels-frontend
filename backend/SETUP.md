# 🚀 OKO TRAVELS - Guía de Configuración del Panel CMS

## 1️⃣ Instalación y Configuración Inicial

### Paso 1: Instalar Dependencias
```bash
cd backend
npm install
```

### Paso 2: Crear archivo `.env`
```bash
cp .env.example .env
```

### Paso 3: Configurar Variables de Entorno
Editar `.env` con tus valores:
```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster0.mongodb.net/oko_travels
PORT=5000
NODE_ENV=development
JWT_SECRET=tu_secreto_super_seguro_aqui_12345
CORS_ORIGIN=http://localhost:8080
```

### Paso 4: Poblar Base de Datos con Datos de Ejemplo

**Insertar artículos de ejemplo:**
```bash
node seeds.js
```

**Crear usuarios de prueba:**
```bash
node seeds-users.js
```

## 2️⃣ Ejecutar el Servidor

### En Desarrollo (con hot reload)
```bash
npm run dev
```

### En Producción
```bash
npm start
```

El servidor estará disponible en: `http://localhost:5000`

## 3️⃣ Acceder al Panel CMS

### URL de Acceso
```
http://localhost:8080/backend/cms/login.html
```

### Credenciales de Prueba
```
Email: admin@oko.com
Contraseña: Admin123!
```

O también:
```
Email: editor@oko.com
Contraseña: Editor123!
```

## 4️⃣ Estructura de Autenticación

### Login Flow
1. Usuario ingresa email y contraseña en `login.html`
2. Se envía petición POST a `/api/auth/login`
3. Backend verifica credenciales y retorna JWT token
4. Token se almacena en `localStorage`
5. Usuario es redirigido al dashboard (`index.html`)

### Token JWT
- **Expiración:** 7 días
- **Almacenamiento:** localStorage (clave: `authToken`)
- **Usuario:** JSON en localStorage (clave: `user`)
- **Header:** `Authorization: Bearer <token>`

## 5️⃣ Funcionalidades del Panel CMS

### Dashboard
- 📊 Estadísticas generales
- 📈 Resumen de artículos
- 👥 Resumen de usuarios
- 📧 Resumen de suscriptores

### Gestión de Artículos
- ✏️ Crear nuevos artículos
- 📝 Editar artículos existentes
- 🗑️ Eliminar artículos
- 🔍 Ver lista de todos los artículos
- Campos disponibles:
  - Título
  - Categoría
  - Descripción
  - Contenido
  - Imagen principal (URL)
  - Mejor temporada
  - Rango de precios (mín/máx)
  - Estado (publicado/borrador)

### Gestión de Usuarios
- 👥 Ver lista de usuarios registrados
- 📊 Información de actividad
- ⏰ Último acceso registrado

### Gestión de Suscriptores
- 📧 Ver lista de suscriptores
- 🏷️ Ver intereses de cada suscriptor
- 📊 Estadísticas de suscripción
- 🎯 Intereses más comunes

### Configuración
- ⚙️ Cambiar URL de API
- 💾 Guardar configuraciones
- 🔓 Cerrar sesión

## 6️⃣ Endpoints API Protegidos

### Autenticación
```
POST   /api/auth/register    - Registrar nuevo usuario
POST   /api/auth/login       - Login (retorna token)
GET    /api/auth/profile/:id - Obtener perfil (requiere token)
PUT    /api/auth/profile/:id - Actualizar perfil (requiere token)
POST   /api/auth/change-password/:id - Cambiar contraseña (requiere token)
DELETE /api/auth/account/:id - Eliminar cuenta (requiere token)
```

### Artículos (requieren token para escribir)
```
GET    /api/articles              - Listar artículos (público)
GET    /api/articles/:id          - Obtener artículo (público)
POST   /api/articles              - Crear artículo ⚠️ REQUIERE TOKEN
PUT    /api/articles/:id          - Actualizar artículo ⚠️ REQUIERE TOKEN
DELETE /api/articles/:id          - Eliminar artículo ⚠️ REQUIERE TOKEN
GET    /api/articles/stats/categories - Estadísticas (público)
```

### Suscriptores
```
POST   /api/subscribers/subscribe              - Suscribirse (público)
POST   /api/subscribers/unsubscribe/:email     - Desuscribirse (público)
PUT    /api/subscribers/preferences/:email     - Actualizar preferencias (público)
GET    /api/subscribers/stats/overview         - Estadísticas ⚠️ REQUIERE TOKEN
GET    /api/subscribers/list                   - Listar suscriptores ⚠️ REQUIERE TOKEN
```

## 7️⃣ Envío de Peticiones con Token

### Ejemplo con JavaScript (como en el CMS)
```javascript
const token = localStorage.getItem('authToken');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

const response = await fetch(`${API_URL}/api/articles`, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(articleData)
});
```

### Ejemplo con cURL
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_aqui" \
  -d '{"title":"Nuevo Artículo","category":"playas"}'
```

## 8️⃣ Troubleshooting

### ❌ Error: "No autorizado - Token requerido"
- Asegúrate de estar logueado
- Verifica que el token esté en `localStorage`
- Comprueba que el token no haya expirado (válido por 7 días)

### ❌ Error: "Token inválido o expirado"
- Inicia sesión nuevamente
- Borra el localStorage y vuelve a loguearte
- Verifica que `JWT_SECRET` sea el mismo en `.env`

### ❌ Error: "MONGODB_URI no configurada"
- Crea el archivo `.env`
- Añade tu connection string de MongoDB Atlas
- Reinicia el servidor

### ❌ CORS Error
- Verifica que `CORS_ORIGIN` en `.env` coincida con tu URL frontend
- Por defecto es `http://localhost:8080`

## 9️⃣ Próximos Pasos

- [ ] Integrar Cloudinary para subida de imágenes
- [ ] Implementar envío de emails (newsletter)
- [ ] Crear dashboard de estadísticas avanzadas
- [ ] Implementar búsqueda avanzada
- [ ] Agregar soporte para múltiples idiomas
- [ ] Deploying en Vercel Functions

## 🔟 Archivos Importantes

- `server.js` - Servidor Express principal
- `middleware/auth.js` - Middleware de autenticación JWT
- `routes/articles.js` - Endpoints de artículos
- `routes/users.js` - Endpoints de usuarios
- `routes/subscribers.js` - Endpoints de suscriptores
- `models/Article.js` - Schema de MongoDB para artículos
- `models/User.js` - Schema de MongoDB para usuarios
- `models/Subscriber.js` - Schema de MongoDB para suscriptores
- `cms/login.html` - Página de login del CMS
- `cms/index.html` - Dashboard del CMS
- `seeds.js` - Script para poblar artículos
- `seeds-users.js` - Script para crear usuarios

---

**Última actualización:** 2026-04-13
