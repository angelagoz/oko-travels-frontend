# CARRITO DE COMPRAS - GUÍA COMPLETA

Sistema de carrito funcional con persistencia en localStorage.

## 🎯 Características

✅ **Agregar/Remover Productos**
- Agrega productos desde cualquier página
- El carrito persiste al cerrar el navegador
- Contador actualizado en navbar

✅ **Gestionar Cantidades**
- Aumentar/disminuir cantidad
- Eliminación de items
- Vaciar carrito completo

✅ **Cálculos Automáticos**
- Subtotal en tiempo real
- Impuestos (10%)
- Total con impuestos
- Envío gratis

✅ **Flujo de Compra Completo**
1. Agregar productos → Carrito
2. Ver carrito → carrito.html
3. Revisar y modificar
4. Pagar → checkout.html
5. Confirmación → exito.html

## 📄 Archivos Creados

| Archivo | Descripción |
|---------|-------------|
| `carrito.html` | Página del carrito |
| `carrito-app.js` | Lógica del carrito |
| `checkout.html` | Página de pago |
| `exito.html` | Confirmación de pago |
| `cancelado.html` | Error de pago |

## 🚀 Cómo Funciona

### 1. Agregar Producto al Carrito

**Desde cualquier página con productos:**

```html
<button class="agregar-carrito"
        data-id="crucero-1"
        data-nombre="Crucero Caribeño"
        data-precio="1200"
        data-tipo="crucero">
    🛒 Agregar al Carrito
</button>
```

El JavaScript detecta automáticamente el clic y agrega el producto.

### 2. Ver el Carrito

**Opción A:** Haz clic en el botón "🛒 Carrito" en el navbar

**Opción B:** Ve directamente a `carrito.html`

### 3. Modificar Cantidad

En la página del carrito:
- Usa los botones `+` y `-` para cambiar cantidad
- O ingresa directamente el número

### 4. Eliminar Producto

Haz clic en el botón "🗑️ Eliminar" en el item

### 5. Proceder al Pago

Haz clic en "💳 Ir a Pagar" para ir a checkout

## 💻 Integración Frontend

### Incluir el Script

En `index.html` (antes de cerrarlo):
```html
<script src="carrito-app.js"></script>
<script src="script.js"></script>
</body>
</html>
```

### Crear Botones de Agregar

Los botones se agregan automáticamente si tienen la clase `agregar-carrito`:

```html
<button class="agregar-carrito"
        data-id="tour-1"
        data-nombre="Tour a Europa"
        data-precio="2500"
        data-tipo="tour">
    Agregar
</button>
```

### Acceder al Carrito desde JS

```javascript
// Crear instancia
let carrito = new CarritoApp();

// Agregar producto
carrito.agregar({
    id: 'producto-1',
    nombre: 'Producto',
    precio: 100,
    tipo: 'crucero'
});

// Obtener total
console.log(carrito.obtenerTotal());

// Obtener cantidad
console.log(carrito.obtenerCantidad());

// Remover producto
carrito.remover('producto-1');
```

## 📊 Estructura de Datos

### Item en el Carrito

```javascript
{
    id: "crucero-1",           // ID único
    nombre: "Crucero Caribeño", // Nombre del producto
    precio: 1200,              // Precio unitario
    tipo: "crucero",           // Tipo: crucero, tour, disney, hotel
    descripcion: "7 días",     // Descripción opcional
    imagen: "⛴️",             // Emoji o URL
    cantidad: 2                // Cantidad en carrito
}
```

## 🔒 Almacenamiento

El carrito se guarda automáticamente en **localStorage**:

```javascript
// Datos guardados en: localStorage.getItem('carrito_luchris')
// Formato: JSON

{
    "id": "crucero-1",
    "nombre": "Crucero Caribeño",
    "precio": 1200,
    "cantidad": 2
}
```

**Ventajas:**
- Persiste entre sesiones
- No requiere servidor
- Sin límites de tiempo

## 🧮 Cálculos

### Subtotal
```
Subtotal = Σ(precio × cantidad)
```

### Impuestos
```
Impuestos = Subtotal × 0.10 (10%)
```

### Total
```
Total = Subtotal + Impuestos
```

### Envío
```
Envío = Gratis
```

## 🔄 Flujo de Pago

```
1. Usuario agrega productos al carrito
   ↓
2. Va a carrito.html
   ↓
3. Revisa y modifica cantidades
   ↓
4. Haz clic "💳 Ir a Pagar"
   ↓
5. Se guarda carrito en sessionStorage
   ↓
6. Redirige a checkout.html
   ↓
7. Completa datos de pago
   ↓
8. Stripe procesa la tarjeta
   ↓
9. Si es exitoso → exito.html
   10. Si falla → cancelado.html
```

## 📱 Responsive

El carrito es completamente responsive:
- ✅ Desktop (2 columnas)
- ✅ Tablet (1 columna)
- ✅ Mobile (ajustado)

## ⚙️ Configuración

### Cambiar Tasa de Impuesto

En `carrito-app.js`:
```javascript
obtenerImpuestos() {
    return this.obtenerSubtotal() * 0.10; // Cambiar 0.10 por el porcentaje deseado
}
```

### Cambiar Envío

En `carrito.html`:
```html
<span id="envio">Gratis</span> <!-- Cambiar aquí -->
```

## 🐛 Troubleshooting

**Q: El carrito no persiste**
- A: Verifica que localStorage no esté deshabilitado
- A: Comprueba que `carrito-app.js` esté incluido

**Q: Los botones "Agregar" no funcionan**
- A: Asegúrate de tener la clase `agregar-carrito`
- A: Verifica que tengan los atributos `data-*`

**Q: No veo el contador en el navbar**
- A: Comprueba que haya un elemento `.carrito-btn` en el navbar
- A: Verifica que el script esté cargado

## 📚 Referencias

- `carrito-app.js` - Lógica principal
- `carrito.html` - Interfaz del carrito
- `checkout.html` - Página de pago
- `exito.html` - Confirmación
- `cancelado.html` - Error de pago

## 🎓 Ejemplo Completo

```html
<!-- En una página de productos -->
<div class="producto-card">
    <h3>Crucero Royal Caribbean</h3>
    <p>7 días por el Caribe</p>
    <span>$1,200</span>
    <button class="agregar-carrito"
            data-id="royal-7d"
            data-nombre="Crucero Royal Caribbean 7D"
            data-precio="1200"
            data-tipo="crucero">
        🛒 Agregar al Carrito
    </button>
</div>

<!-- El usuario hace clic y: -->
<!-- 1. Se agrega el producto al carrito -->
<!-- 2. Aparece notificación "✅ Producto agregado" -->
<!-- 3. Navbar muestra "🛒 Carrito (1)" -->
<!-- 4. Dato se guarda en localStorage -->
```

---

**¡Tu carrito está listo para funcionar!** 🛒
