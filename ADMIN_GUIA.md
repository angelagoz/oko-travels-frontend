# GUÍA: PANEL ADMINISTRATIVO

## 🔐 Acceso al Panel Admin

**URL:** https://luchris-travels-frontend.vercel.app/admin-login.html

### Credenciales (Temporales)
- **Usuario:** admin@luchris.com
- **Contraseña:** admin123

> ⚠️ **NOTA:** En producción, cambiar estas credenciales y usar autenticación segura con backend

---

## 📊 Dashboard Principal

Al iniciar sesión, verás:

### 1️⃣ Estadísticas Generales
- **Nuevas Solicitudes** - Cotizaciones no contactadas
- **Contactadas** - Ya respondidas pero pendientes
- **Completadas** - Cerradas (venta o rechazo)
- **Total** - Suma de todas

### 2️⃣ Tabla de Cotizaciones
Muestra todas las solicitudes recibidas con:
- Nombre del cliente
- Email
- Teléfono
- Tipo de camarote solicitado
- Cantidad de pasajeros
- **Estado** - Se puede filtrar
- **Acciones** - Ver, Responder, Eliminar

---

## 🎯 Acciones Disponibles

### Ver Detalles
- Click en botón **"Ver"**
- Se abre modal con información completa:
  - Datos personales del cliente
  - Detalles de la solicitud
  - Fecha de recepción
  - Respuesta anterior (si existe)

### Responder Cotización
- Click en botón **"✉️"**
- Se abre formulario para:
  - Cambiar estado
  - Escribir respuesta personalizada

**Estados disponibles:**
- `contactada` - Se contactó al cliente
- `completada` - Se cerró la transacción
- `cancelada` - Cliente canceló

### Eliminar
- Click en botón **"🗑️"**
- Pide confirmación antes de eliminar

---

## 🔍 Filtros

En la parte superior de la tabla:

- **Todas** - Muestra todas las cotizaciones
- **Nuevas** - Solo las que aún no se han contactado
- **Contactadas** - Las que tienen respuesta pendiente
- **Completadas** - Las que finalizaron

---

## 💬 Respondiendo a Clientes

### Paso 1: Hacer Click en ✉️
Se abre modal con:
- Información del cliente (nombre, email, teléfono)
- Detalles de su solicitud

### Paso 2: Completar Formulario
1. Seleccionar nuevo estado
2. Escribir tu respuesta

**Ejemplo de respuesta:**
```
Estimada Angela,

Gracias por tu interés en nuestros cruceros.

Para 2 pasajeros en camarote balcón en la fecha del 15 de abril,
el precio es de $2,598 por persona (incluidos impuestos).

Oferta especial: si reservas esta semana, 15% de descuento.

Te contactaremos pronto con más opciones.

¡Saludos!
LUCHRIS TRAVELS
+1 (829) 550-2847
```

### Paso 3: Enviar
Click en "Enviar Respuesta"
- Se actualiza el estado
- Se guarda la respuesta
- El cliente verá que fue contactado

---

## 🔄 Flujo de Trabajo Recomendado

```
1. Cotización Llega
   ↓
2. Estado: "nueva" (automático)
   ↓
3. Leer detalles → Click "Ver"
   ↓
4. Verificar disponibilidad y hacer presupuesto
   ↓
5. Responder → Click "✉️"
   ↓
6. Cambiar a "contactada" + escribir oferta
   ↓
7. Cliente responde (fuera del sistema)
   ↓
8. Si compra:
   - Cambiar a "completada"
   - Añadir detalles de reserva

9. Si no quiere:
   - Cambiar a "cancelada"
```

---

## 🔐 Seguridad

### Autenticación Local
El panel usa **localStorage** para almacenar token:
```javascript
localStorage.getItem('admin_token');
localStorage.getItem('admin_email');
```

### Mejoras Futuras
- [ ] Autenticación con Backend (JWT)
- [ ] Diferentes roles de admin
- [ ] Registro de acciones (quién hizo qué)
- [ ] Contraseñas seguras con bcrypt
- [ ] 2FA (Autenticación de dos factores)

---

## 📱 Responsive Design

El panel se adapta a:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

---

## 🔗 Integración Backend

### API Endpoints Usados

```
GET    /api/cotizaciones          → Obtener todas
GET    /api/cotizaciones/:id      → Ver detalle
PUT    /api/cotizaciones/:id      → Actualizar respuesta
DELETE /api/cotizaciones/:id      → Eliminar
```

### Auto-Refresh
El panel se actualiza automáticamente cada **30 segundos**

---

## ⚙️ Configuración Futura

### Email Automático
Cuando respondas, enviar email al cliente:
```
To: angela@example.com
Subject: Respuesta a tu Cotización - LUCHRIS TRAVELS
Body: [Tu respuesta]
```

### Notificaciones WhatsApp
```
WhatsApp Business API:
+1 (829) 550-2847
Mensaje: "Nuevo cotización de {nombre}"
```

### CRM Integrado
Guardar historial de interacciones:
- Cuándo se contactó
- Qué se ofreció
- Por qué no compró (si aplica)

---

## 🆘 Solución de Problemas

### Panel no carga
1. Verificar que estés logueado
2. Limpiar caché del navegador (Ctrl+Shift+Del)
3. Verificar conexión a internet

### No aparecen cotizaciones
1. Esperar 30 segundos (auto-refresh)
2. Hacer refresh (F5)
3. Verificar que MongoDB esté funcionando

### Error al responder
1. Verificar que llenar todos los campos
2. Revisar consola (F12) para detalles de error
3. Intentar nuevamente

---

## 📞 Contacto & Soporte

- **Teléfono:** +1 (829) 550-2847
- **Email:** luchristravels@gmail.com
- **Horario:** Lunes a Viernes 9:00 AM - 6:00 PM

---

**Última actualización:** 26 de Marzo, 2026
