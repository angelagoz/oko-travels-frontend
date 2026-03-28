// CARRITO ULTRA SIMPLE
localStorage.setItem('carrito_productos', JSON.stringify([]));

function agregarCarrito(nombre, precio, tipo) {
    let carrito = JSON.parse(localStorage.getItem('carrito_productos')) || [];
    carrito.push({ nombre, precio, tipo, id: Date.now() });
    localStorage.setItem('carrito_productos', JSON.stringify(carrito));
    alert('✅ ' + nombre + ' agregado al carrito!');
    actualizarContador();
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('carrito_productos')) || [];
    let contador = document.getElementById('carrito-count');
    if (contador) {
        contador.textContent = carrito.length;
        contador.style.display = carrito.length > 0 ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
});
