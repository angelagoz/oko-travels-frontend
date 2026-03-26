# CONFIGURACIÓN DE STRIPE - LUCHRIS TRAVELS

Guía paso a paso para configurar los pagos con Stripe.

## 🔑 Paso 1: Crear Cuenta en Stripe

1. Visita [stripe.com](https://stripe.com)
2. Haz clic en **"Sign up"**
3. Completa tu email, contraseña y país
4. Verifica tu email
5. Completa tu perfil de negocio

## 📋 Paso 2: Obtener Tus Claves API

1. Inicia sesión en [dashboard.stripe.com](https://dashboard.stripe.com)
2. Ve a **"Developers"** → **"API Keys"**
3. Encontrarás dos tipos de claves:
   - **Publishable Key** (clave pública) - Para usar en el frontend
   - **Secret Key** (clave secreta) - Para usar en el backend

**Ejemplo:**
```
Publishable Key: pk_test_51234567890abcdefgh...
Secret Key: sk_test_1234567890abcdefgh...
```

## 🔐 Paso 3: Configurar Variables de Entorno

En la carpeta `server/`, edita el archivo `.env` y agrega:

```env
STRIPE_SECRET_KEY=sk_test_1234567890abcdefgh...
STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdefgh...
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefgh...
```

## 🌐 Paso 4: Configurar Webhook

Los webhooks permiten que Stripe confirme los pagos automáticamente.

### En Dashboard de Stripe:
1. Ve a **"Developers"** → **"Webhooks"**
2. Haz clic en **"Add endpoint"**
3. Ingresa tu URL: `https://tu-servidor.com/api/pagos/webhook`
4. Selecciona los eventos:
   - ✅ `checkout.session.completed`
   - ✅ `charge.succeeded`
   - ✅ `charge.failed`
5. Haz clic en **"Add endpoint"**
6. Copia la clave de firma del webhook
7. Pégala en tu archivo `.env` como `STRIPE_WEBHOOK_SECRET`

## 💻 Paso 5: Configurar Frontend

En `checkout.html`, reemplaza:

```javascript
// BUSCA ESTA LÍNEA:
const stripe = Stripe('PUBLICABLE_KEY_AQUI');

// REEMPLAZALA CON:
const stripe = Stripe('pk_test_51234567890abcdefgh...');
```

## 🧪 Paso 6: Probar en Modo Test

Stripe incluye tarjetas de prueba para testing.

**Tarjetas de Prueba Disponibles:**

| Tarjeta | Número | Fecha | CVC |
|---------|--------|-------|-----|
| Visa | 4242 4242 4242 4242 | 12/26 | 123 |
| Mastercard | 5555 5555 5555 4444 | 12/26 | 123 |
| Amex | 3782 822463 10005 | 12/26 | 1234 |

**Casos de Prueba:**
- Cualquier fecha futura funciona
- Cualquier CVC de 3 dígitos funciona
- Email puede ser cualquiera

## 📡 Paso 7: Conectar Servidor

Asegúrate que el servidor esté corriendo:

```bash
cd server
npm install
npm run dev
```

El servidor debe estar en: `http://localhost:5000`

## 🔄 Paso 8: Flujo de Pago Completo

### Cliente:
1. Agrega productos al carrito
2. Va a checkout.html
3. Completa formulario de pago
4. Hizo clic en "💳 Pagar Ahora"

### Backend:
1. Recibe solicitud en `/api/pagos/pago-directo`
2. Procesa pago con Stripe
3. Si es exitoso, actualiza estado de reserva a "pagada"
4. Retorna confirmación al cliente

### Webhook:
1. Stripe envía confirmación a tu servidor
2. Servidor actualiza base de datos
3. Cliente recibe confirmación

## ✅ Verificar Configuración

Para verificar que todo está correcto:

1. **Backend corriendo:** ✅ `http://localhost:5000/api/health`
2. **API conectando:** ✅ Prueba crear una reserva
3. **Stripe conectado:** ✅ Intenta un pago de prueba

## 🚨 Errores Comunes

**Error: "Invalid API Key"**
- Verifica que copiaste correctamente la clave en `.env`
- No uses la clave pública en el backend

**Error: "Stripe is not defined"**
- Falta el script de Stripe en checkout.html
- Añade: `<script src="https://js.stripe.com/v3/"></script>`

**Error: "Invalid stripe key"**
- Reemplaza `PUBLICABLE_KEY_AQUI` en checkout.html
- Usa tu clave pública real

## 📚 Rutas de Pago Disponibles

### POST `/api/pagos/crear-pago`
Crear sesión de pago (recomendado para producción)

```json
{
  "reservaId": "...",
  "email": "cliente@example.com",
  "monto": 1200
}
```

### POST `/api/pagos/pago-directo`
Procesar pago inmediato con token

```json
{
  "reservaId": "...",
  "token": "tok_...",
  "monto": 1200
}
```

### GET `/api/pagos/estado/:sessionId`
Obtener estado de una sesión de pago

## 🔐 Seguridad

✅ **Nunca expongas tu Secret Key**
- Solo en el servidor
- Nunca en código del frontend
- Nunca en GitHub sin .gitignore

✅ **Usa HTTPS en producción**
- Stripe requiere conexión segura
- Usa certificados SSL válidos

✅ **Valida montos en el servidor**
- Un usuario podría modificar el monto en frontend
- Siempre verifica en backend

## 📞 Soporte Stripe

- Documentación: [stripe.com/docs](https://stripe.com/docs)
- Centro de Ayuda: [support.stripe.com](https://support.stripe.com)
- Email de Soporte: [stripe-help@stripe.com](mailto:stripe-help@stripe.com)

---

**¡Tu tienda está lista para recibir pagos con Stripe!** 🎉
