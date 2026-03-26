# CMS LUCHRIS TRAVELS

Panel de Administración Visual para gestionar contenido sin programar.

## 🎯 Características

### 📊 Dashboard Intuitivo
- Interfaz amigable y fácil de usar
- Sidebar de navegación con opciones claras
- Vista de grid para todos los productos

### 🚢 Gestión de Cruceros
- Agregar nuevos cruceros
- Editar información (nombre, naviera, duración, descripción)
- Eliminar cruceros
- Filtrar por salida (RD o Miami)

### ✈️ Gestión de Tours
- Crear tours internacionales
- Especificar destino y duración
- Establecer precios
- Actualizar información

### 🎢 Paquetes Disney
- Agregar paquetes de vacaciones
- Definir parques incluidos
- Establecer duración y precios
- Gestionar inventario

### 🏨 Hoteles
- Crear hoteles disponibles
- Especificar ciudad y servicios
- Establecer precio por noche
- Administrar disponibilidad

### 📋 Reservas
- Ver todas las reservas
- Actualizar estado (pendiente, confirmada, pagada, cancelada)
- Ver detalles del cliente y crucero

### 📊 Reportes
- Ventas totales
- Reservas confirmadas
- Clientes registrados
- Productos activos

## 🚀 Cómo Usar

### 1. Acceder al CMS
```
Abre en tu navegador: http://localhost:3000/cms/
```

### 2. Agregar un Nuevo Crucero
1. Haz clic en **"➕ Nuevo"**
2. Completa los campos:
   - **Nombre**: ej. "Crucero Caribeño 7 Días"
   - **Naviera**: ej. "Royal Caribbean"
   - **Descripción**: información del crucero
   - **Duración**: cantidad de días
   - **Salida desde**: RD o Miami
   - **Servicios**: piscina, restaurantes, shows, etc.
3. Haz clic en **"💾 Guardar"**

### 3. Editar un Crucero
1. Busca el crucero en la lista
2. Haz clic en el botón **"✏️ Editar"**
3. Modifica los campos que necesites
4. Haz clic en **"💾 Guardar"**

### 4. Eliminar un Crucero
1. Busca el crucero en la lista
2. Haz clic en **"🗑️ Eliminar"**
3. Confirma la eliminación

### 5. Cambiar entre Productos
Usa el menú lateral para cambiar entre:
- ⛴️ Cruceros
- ✈️ Tours
- 🎢 Paquetes Disney
- 🏨 Hoteles
- 📋 Reservas
- 📊 Reportes

## 📋 Campos por Tipo de Producto

### CRUCEROS
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre | Texto | Sí |
| Naviera | Texto | Sí |
| Descripción | Texto largo | No |
| Duración | Número | Sí |
| Salida desde | Selección | Sí |
| Servicios | Texto | No |

### TOURS
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre | Texto | Sí |
| Destino | Texto | Sí |
| Descripción | Texto largo | No |
| Duración | Número | Sí |
| Precio | Número | Sí |

### PAQUETES DISNEY
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre | Texto | Sí |
| Descripción | Texto largo | No |
| Duración | Número | Sí |
| Precio | Número | Sí |
| Parques | Texto | Sí |

### HOTELES
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre | Texto | Sí |
| Ciudad | Texto | Sí |
| Descripción | Texto largo | No |
| Precio/Noche | Número | Sí |
| Servicios | Texto | No |

## 🔄 Flujo de Trabajo

```
1. Abre el CMS
   ↓
2. Selecciona tipo de producto (Cruceros, Tours, etc.)
   ↓
3. Haz clic en "➕ Nuevo" para crear
   ↓
4. Completa los campos del formulario
   ↓
5. Haz clic en "💾 Guardar"
   ↓
6. Verifica en la lista que aparezca tu nuevo producto
   ↓
7. Puedes editar o eliminar cuando lo necesites
```

## 💡 Consejos

✅ **Siempre llena los campos requeridos** (marcados con *)
✅ **Las descripciones claras ayudan a los clientes** a entender mejor el producto
✅ **Verifica los precios antes de guardar** para evitar errores
✅ **Usa el buscador** para encontrar productos rápidamente
✅ **Los cambios se guardan automáticamente** en la base de datos

## ⚠️ Importante

- El CMS requiere que el servidor esté ejecutándose en `http://localhost:5000`
- Todos los cambios se guardan en la base de datos
- Puedes eliminar productos, pero **no se pueden recuperar**
- Los datos se actualizan en tiempo real en la página web

## 📞 Soporte

Si tienes problemas:
1. Verifica que el servidor esté corriendo
2. Abre la consola del navegador (F12) para ver errores
3. Contacta al equipo técnico

---

**LUCHRIS TRAVELS © 2026** - Panel de Administración
