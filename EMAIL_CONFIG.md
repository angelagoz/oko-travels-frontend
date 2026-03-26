# 📧 Configuración de Sistema de Emails

## 🎯 Descripción

Sistema automático de emails que notifica:
- ✅ **Cliente:** Confirmación de cotización recibida
- ✅ **Admin:** Notificación de nueva cotización
- ✅ **Cliente:** Respuesta cuando admin contacta

---

## 🚀 Configuración Rápida (Gmail)

### Paso 1: Habilitar Autenticación de 2 Factores
1. Ve a https://myaccount.google.com/
2. Click en "Seguridad" (lado izquierdo)
3. Habilita "Verificación en 2 pasos"

### Paso 2: Crear Contraseña de Aplicación
1. En Seguridad, ve a "Contraseñas de aplicación"
2. Selecciona:
   - Aplicación: Mail
   - Dispositivo: Windows/Mac/Linux
3. Google te generará una contraseña de 16 caracteres
4. **Copia esta contraseña** (necesita espacio eliminados)

### Paso 3: Configurar Variables de Entorno

En **Render.com** (Backend):

1. Ve a tu aplicación en Render
2. Settings → Environment Variables
3. Agrega estas variables:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=abc123def456ghi78j
ADMIN_EMAIL=luchristravels@gmail.com
```

> ⚠️ Usa la contraseña sin espacios que Google generó

### Paso 4: Reiniciar Backend

El backend se redesplegará automáticamente. Verifica que los emails se envíen.

---

## 🔧 Alternativas de Proveedores

### SendGrid (Recomendado para Producción)
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.tu_api_key_aqui
```

**Ventajas:**
- 100 emails/día gratis
- Mejor entregabilidad
- Análisis de opens y clicks
- Soporte 24/7

**Setup:**
1. Crear cuenta en https://sendgrid.com/
2. Verificar dominio
3. Crear API Key
4. Usar API Key como password

---

### Mailgun
```
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@tu-dominio.mailgun.org
EMAIL_PASSWORD=tu_password_mailgun
```

---

### AWS SES (Amazon Simple Email Service)
```
EMAIL_HOST=email-smtp.region.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=tu_usuario_ses
EMAIL_PASSWORD=tu_contraseña_ses
```

---

## 📧 Plantillas de Email

### 1. Confirmación para Cliente
- Asunto: "✅ Cotización Recibida - LUCHRIS TRAVELS"
- Contiene: Resumen de solicitud + información de contacto
- Se envía: Inmediatamente al recibir cotización

### 2. Notificación para Admin
- Asunto: "🔔 NUEVA COTIZACIÓN - [Nombre Cliente]"
- Contiene: Datos completos + link al panel admin
- Se envía: Inmediatamente al recibir cotización

### 3. Respuesta al Cliente
- Asunto: "💬 Respuesta a tu Cotización - LUCHRIS TRAVELS"
- Contiene: Mensaje de admin + información de contacto
- Se envía: Cuando admin responde en panel

---

## 🧪 Pruebas

### Test Local
```bash
cd server
npm install
node index.js
```

Verifica en consola:
```
✅ Servicio de email listo para enviar
```

### Test en Producción
1. Ve a https://luchris-travels-frontend.vercel.app/cruise-detail.html
2. Completa formulario de cotización
3. Revisa tu bandeja de entrada

**Deberías recibir:**
- Email de confirmación de cotización
- Email de notificación en admin

---

## 🔍 Solución de Problemas

### Email no se envía
```
❌ Error: Invalid login or password
```
**Soluciones:**
- Verificar contraseña (sin espacios)
- Verificar 2FA habilitado
- Generar nueva contraseña de app
- Esperar 5 minutos después de generar

### "Less secure apps" (Gmail)
Google bloqueó aplicaciones menos seguras.

**Solución:**
1. Usa contraseña de aplicación (no la contraseña de cuenta)
2. O habilita: https://myaccount.google.com/lesssecureapps

### Timeout de conexión
```
❌ Error: connect ETIMEDOUT
```
**Soluciones:**
- Verificar que EMAIL_PORT es correcto (587, no 465)
- Verificar firewall permite puerto 587
- Probar con SendGrid (más confiable)

### Email llega a spam
**Soluciones:**
- Usar dominio propio (no gmail.com)
- Configurar SPF y DKIM
- Usar SendGrid o similar
- Agregar "empresa verificada" en firmas

---

## 📊 Estadísticas y Monitoreo

### Ver logs de emails enviados
En consola del servidor:
```
✅ Email de confirmación enviado a: cliente@example.com
✅ Email de notificación enviado a admin: admin@luchris.com
⚠️ Error enviando email: reason...
```

### Verificar entrega
Algunos proveedores ofrecen:
- Open tracking
- Click tracking
- Bounce handling
- Spam complaints

---

## 💰 Costos

| Proveedor | Plan Gratuito | Costo |
|-----------|---------------|-------|
| **Gmail** | 📧 Limitado | $0 |
| **SendGrid** | 📧 100/día | $0-$29.95 |
| **Mailgun** | 📧 Limitado | $0-$35 |
| **AWS SES** | 📧 62,000/mes | ~$0.10 por 1000 |

---

## 🔐 Seguridad

### Buenas Prácticas
- ✅ Nunca commitear credentials en Git
- ✅ Usar variables de entorno
- ✅ Usar contraseñas de aplicación (no contraseña de cuenta)
- ✅ Rotar credenciales mensualmente
- ✅ Usar HTTPS (ya implementado)

### En Render
Las variables están cifradas y no se ven en logs.

---

## 📞 Contacto para Preguntas

- **Email:** luchristravels@gmail.com
- **Teléfono:** +1 (829) 550-2847

---

**Última actualización:** 26 de Marzo, 2026
**Estado:** ✅ Sistema implementado y listo
