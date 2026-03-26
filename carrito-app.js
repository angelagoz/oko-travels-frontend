/* ========================================
   CARRITO DE COMPRAS - APLICACION COMPLETA
   ======================================== */

// ========================================
// CLASE CARRITO
// ========================================

class CarritoApp {
    constructor() {
        this.items = this.cargarDelLocalStorage();
        this.inicializar();
        this.actualizar();
    }

    // CARGAR DESDE LOCAL STORAGE
    cargarDelLocalStorage() {
        const datos = localStorage.getItem('carrito_luchris');
        return datos ? JSON.parse(datos) : [];
    }

    // GUARDAR EN LOCAL STORAGE
    guardarEnLocalStorage() {
        localStorage.setItem('carrito_luchris', JSON.stringify(this.items));
    }

    // AGREGAR ITEM AL CARRITO
    agregar(producto) {
        const itemExistente = this.items.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad += producto.cantidad || 1;
        } else {
            this.items.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                tipo: producto.tipo, // 'crucero', 'tour', 'disney', 'hotel'
                descripcion: producto.descripcion || '',
                imagen: producto.imagen || '🎫',
                cantidad: producto.cantidad || 1
            });
        }

        this.guardarEnLocalStorage();
        this.actualizar();
        this.mostrarNotificacion('✅ Producto agregado al carrito');
    }

    // REMOVER ITEM DEL CARRITO
    remover(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarEnLocalStorage();
        this.actualizar();
    }

    // ACTUALIZAR CANTIDAD
    actualizarCantidad(id, cantidad) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.cantidad = Math.max(1, parseInt(cantidad));
            this.guardarEnLocalStorage();
            this.actualizar();
        }
    }

    // VACIAR CARRITO
    vaciar() {
        if (confirm('¿Deseas vaciar tu carrito?')) {
            this.items = [];
            this.guardarEnLocalStorage();
            this.actualizar();
        }
    }

    // OBTENER CANTIDAD TOTAL
    obtenerCantidad() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    // OBTENER SUBTOTAL
    obtenerSubtotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    // OBTENER IMPUESTOS
    obtenerImpuestos() {
        return this.obtenerSubtotal() * 0.10;
    }

    // OBTENER TOTAL
    obtenerTotal() {
        return this.obtenerSubtotal() + this.obtenerImpuestos();
    }

    // INICIALIZAR EVENTOS
    inicializar() {
        // Si estamos en carrito.html
        if (document.getElementById('items-container')) {
            document.getElementById('btn-checkout').addEventListener('click', () => this.irACheckout());
        }

        // Agregar evento a botones de carrito (en páginas de productos)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('agregar-carrito')) {
                const id = e.target.getAttribute('data-id');
                const nombre = e.target.getAttribute('data-nombre');
                const precio = parseFloat(e.target.getAttribute('data-precio'));
                const tipo = e.target.getAttribute('data-tipo');

                this.agregar({
                    id,
                    nombre,
                    precio,
                    tipo,
                    cantidad: 1
                });
            }
        });

        // Evento del botón del carrito en navbar
        const carritoBtn = document.querySelector('.carrito-btn');
        if (carritoBtn) {
            carritoBtn.addEventListener('click', () => window.location.href = 'carrito.html');
        }
    }

    // ACTUALIZAR INTERFAZ
    actualizar() {
        this.actualizarContador();
        this.actualizarPagina();
    }

    // ACTUALIZAR CONTADOR EN NAVBAR
    actualizarContador() {
        const carritoBtn = document.querySelector('.carrito-btn');
        if (carritoBtn) {
            const cantidad = this.obtenerCantidad();
            const texto = cantidad > 0 ? `🛒 Carrito (${cantidad})` : '🛒 Carrito';
            carritoBtn.textContent = texto;
        }
    }

    // ACTUALIZAR PAGINA DE CARRITO
    actualizarPagina() {
        if (!document.getElementById('items-container')) return;

        const container = document.getElementById('items-container');

        if (this.items.length === 0) {
            container.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío. <a href="index.html">Volver a comprar</a></p>';
            document.getElementById('btn-checkout').disabled = true;
        } else {
            container.innerHTML = this.items.map(item => `
                <div class="item-carrito">
                    <div class="item-imagen">${item.imagen}</div>
                    <div class="item-info">
                        <h4>${item.nombre}</h4>
                        <p>${item.descripcion}</p>
                        <p class="item-precio">$${item.precio.toFixed(2)}</p>
                    </div>
                    <div class="item-cantidad">
                        <button onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad - 1})">-</button>
                        <input type="number" value="${item.cantidad}" onchange="carrito.actualizarCantidad('${item.id}', this.value)" min="1">
                        <button onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad + 1})">+</button>
                    </div>
                    <button class="btn-eliminar-item" onclick="carrito.remover('${item.id}')">🗑️ Eliminar</button>
                </div>
            `).join('');

            document.getElementById('btn-checkout').disabled = false;
        }

        // Actualizar resumen
        this.actualizarResumen();
    }

    // ACTUALIZAR RESUMEN
    actualizarResumen() {
        const subtotal = this.obtenerSubtotal();
        const impuestos = this.obtenerImpuestos();
        const total = this.obtenerTotal();

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('impuestos').textContent = `$${impuestos.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    // IR A CHECKOUT
    irACheckout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Guardar carrito en sessionStorage para usarlo en checkout
        sessionStorage.setItem('carrito_checkout', JSON.stringify({
            items: this.items,
            subtotal: this.obtenerSubtotal(),
            impuestos: this.obtenerImpuestos(),
            total: this.obtenerTotal()
        }));

        // Redirigir a checkout
        window.location.href = 'checkout.html';
    }

    // MOSTRAR NOTIFICACION
    mostrarNotificacion(mensaje) {
        const notif = document.createElement('div');
        notif.className = 'notificacion';
        notif.textContent = mensaje;
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28A745;
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 3000);
    }
}

// ========================================
// INICIALIZACION
// ========================================

let carrito;

document.addEventListener('DOMContentLoaded', () => {
    carrito = new CarritoApp();

    // Ejemplo: Agregar productos a carrito (en la página principal)
    if (document.querySelector('.productos-grid')) {
        document.querySelectorAll('.producto-card').forEach(card => {
            const btnAgregar = document.createElement('button');
            btnAgregar.className = 'btn-secondary agregar-carrito';
            btnAgregar.setAttribute('data-id', card.getAttribute('data-id') || Math.random());
            btnAgregar.setAttribute('data-nombre', card.querySelector('h4').textContent);
            btnAgregar.setAttribute('data-precio', card.getAttribute('data-precio') || '0');
            btnAgregar.setAttribute('data-tipo', 'crucero');
            btnAgregar.textContent = '🛒 Agregar al Carrito';

            // Insertar botón en la tarjeta
            const actions = card.querySelector('.producto-actions');
            if (actions) {
                actions.appendChild(btnAgregar);
            }
        });
    }
});

console.log('✅ Carrito de Compras - Aplicación Cargada');
