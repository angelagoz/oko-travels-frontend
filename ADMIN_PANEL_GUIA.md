# 📊 ADMIN PANEL - GUÍA COMPLETA

## 🔗 URLs DE ACCESO

| Sección | URL |
|---------|-----|
| **Productos** | `file:///C:\Users\DELL\Desktop\PROYECTO 1 LT\admin-productos.html` |
| **Cotizaciones** | `file:///C:\Users\DELL\Desktop\PROYECTO 1 LT\admin-cotizaciones.html` |
| **Estadísticas** | `file:///C:\Users\DELL\Desktop\PROYECTO 1 LT\admin-estadisticas.html` |
| **Login** | `file:///C:\Users\DELL\Desktop\PROYECTO 1 LT\admin-login.html` |

---

## 📝 ADMIN DE PRODUCTOS

### ¿QUÉ PUEDES HACER?

✅ **Crear productos** (Cruceros, Tours, Disney)
✅ **Subir fotos** con Cloudinary (sin código)
✅ **Editar productos** existentes
✅ **Eliminar productos**
✅ **Filtrar por categoría** (Todos, Cruceros, Tours, Disney)

---

## 🚀 CÓMO CREAR UN PRODUCTO

### PASO 1: Abre el Admin de Productos
```
file:///C:\Users\DELL\Desktop\PROYECTO 1 LT\admin-productos.html
```

### PASO 2: Haz clic en "➕ Nuevo Producto"

### PASO 3: Completa el formulario

**Campos:**
- **Nombre**: "Crucero ABC" (cualquier nombre)
- **Tipo**: Elige (Crucero / Tour / Disney)
- **Descripción**: "5 noches visitando..." (breve descripción)
- **Precio Base**: "1299" (número solo, sin $)
- **Duración (días)**: "5" (número de días)

### PASO 4: Sube una FOTO

1. Haz clic en **"📷 Seleccionar Foto"**
2. Se abrirá Cloudinary (sin necesidad de login)
3. Sube una foto desde:
   - 💻 Tu computadora
   - 🌐 URL de internet
   - 📱 Cámara (si está disponible)
4. Una vez subida, la foto aparecerá en la vista previa

### PASO 5: Haz clic en "✅ Guardar Producto"

¡Listo! El producto aparecerá en la lista y en la página principal automáticamente.

---

## 📸 FUENTES DE IMÁGENES RECOMENDADAS

**Gratuitas y sin Copyright:**

1. **Unsplash** - https://unsplash.com
   - Busca: "cruise", "travel", "disney"
   - Copia el link de la foto

2. **Pexels** - https://www.pexels.com
   - Idem anterior

3. **Pixabay** - https://pixabay.com
   - Idem anterior

**Pasos:**
1. Busca foto en Unsplash
2. Copia el URL directo (derecha clic → Copiar dirección)
3. En admin, sube por "URL"

---

## 💡 EJEMPLOS DE PRODUCTOS

### Crucero
- **Nombre**: Crucero Royal Caribbean - Caribe
- **Tipo**: Crucero
- **Descripción**: 7 noches navegando el Caribe con entretenimiento incluido
- **Precio**: 1299
- **Duración**: 7
- **Foto**: [URL de barco]

### Tour
- **Nombre**: Tour Turquía - Estambul
- **Tipo**: Tour
- **Descripción**: 10 días visitando Estambul, Éfeso y Capadocia
- **Precio**: 2499
- **Duración**: 10
- **Foto**: [URL de Turquía]

### Disney
- **Nombre**: Disney World Orlando
- **Tipo**: Disney
- **Descripción**: 7 noches con entradas a 4 parques Disney
- **Precio**: 3499
- **Duración**: 7
- **Foto**: [URL de Disney]

---

## 🔧 CLOUDINARY SETUP (si aún no está configurado)

1. Ve a https://cloudinary.com
2. Regístrate (gratis)
3. Ve a **Settings → Upload**
4. Busca **"Upload Preset"** → Crea uno con:
   - **Mode**: Unsigned
   - **Name**: `luchris_travels_unsigned`
5. Copia el **Upload Preset** name
6. Abre `cloudinary-config.js`
7. Reemplaza:
   ```javascript
   const CLOUDINARY_CONFIG = {
       cloudName: 'TU_CLOUD_NAME',
       uploadPreset: 'TU_PRESET_NAME'
   };
   ```

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Necesito login para Cloudinary?**
R: No, usa Upload Unsigned. No necesitas credenciales.

**P: ¿Qué formatos de imagen acepta?**
R: JPG, PNG, GIF, WebP. Máximo 5MB.

**P: ¿Dónde aparecen mis productos?**
R: En la página principal: https://angelagoz.github.io/luchris-travels-frontend/

**P: ¿Puedo editar un producto existente?**
R: Sí, haz clic en el producto y luego edita.

**P: ¿Se ve en la página en tiempo real?**
R: Sí, recarga la página (F5) y verás los nuevos productos.

---

## 🚨 PROBLEMAS COMUNES

**Problema**: La foto no sube
**Solución**: Verifica que el Upload Preset esté bien configurado en `cloudinary-config.js`

**Problema**: El producto no aparece en la página
**Solución**: Recarga la página (F5) con Ctrl+Shift+R (reload completo)

**Problema**: Error al guardar
**Solución**: Verifica que todos los campos estén completos

---

## ✅ CHECKLIST PARA EMPEZAR

- [ ] Cloudinary cuenta creada
- [ ] Upload Preset configurado
- [ ] `cloudinary-config.js` actualizado
- [ ] Admin de Productos abierto
- [ ] Primera foto subida exitosamente
- [ ] Primer producto creado
- [ ] Producto visible en página principal

---

**¡Listo!** Ahora puedes crear todos los productos que quieras sin código. 🎉
