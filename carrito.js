/* ========================================
   CARRITO DE COMPRAS
   ======================================== */

class Carrito {
    constructor() {
        this.items = this.cargarDelLocal();
    }

    cargarDelLocal() {
        const datos = localStorage.getItem('carrito');
        return datos ? JSON.parse(datos) : [];
    }

    guardarEnLocal() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    agregar(producto) {
        const existe = this.items.find(item => item._id === producto._id);

        if (existe) {
            existe.cantidad++;
        } else {
            this.items.push({
                _id: producto._id,
                nombre: producto.nombre,
                precio_base: producto.precio_base,
                tipo: producto.tipo,
                cantidad: 1,
                destino: producto.destino || ''
            });
        }

        this.guardarEnLocal();
        this.actualizarContador();
    }

    eliminar(id) {
        this.items = this.items.filter(item => item._id !== id);
        this.guardarEnLocal();
        this.actualizarContador();
    }

    vaciar() {
        this.items = [];
        this.guardarEnLocal();
        this.actualizarContador();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.precio_base * item.cantidad), 0);
    }

    getCantidad() {
        return this.items.reduce((sum, item) => sum + item.cantidad, 0);
    }

    actualizarContador() {
        const contador = document.getElementById('carrito-count');
        if (contador) {
            contador.textContent = this.getCantidad();
            contador.style.display = this.getCantidad() > 0 ? 'flex' : 'none';
        }
    }
}

// Instancia global
const carrito = new Carrito();

// Actualizar contador al cargar
document.addEventListener('DOMContentLoaded', () => {
    carrito.actualizarContador();
});
