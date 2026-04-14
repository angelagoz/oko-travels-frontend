const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oko-travels';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✓ MongoDB conectado');
}).catch(err => {
    console.error('✗ Error MongoDB:', err);
});

// ===== MODELOS =====

// Producto Schema
const productoSchema = new mongoose.Schema({
    tipo: { type: String, required: true }, // crucero, tour, disney, etc
    nombre: { type: String, required: true },
    descripcion: String,
    precio_base: Number,
    duracion: String,
    descuento: Number,
    categoria: String,
    tags: [String],
    fotos: [String],
    foto_principal: String,
    activo: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Blog Schema
const blogSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    autor: String,
    categoria: String,
    imagen: String,
    tags: [String],
    publicado: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Destino Schema
const destinoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: String,
    pais: String,
    imagen: String,
    atractivos: [String],
    clima: String,
    mejorEpoca: String,
    createdAt: { type: Date, default: Date.now }
});

// Testimonio Schema
const testimonioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: String,
    texto: String,
    calificacion: Number,
    foto: String,
    aprobado: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Usuario Schema
const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    contraseña: String,
    nombre: String,
    rol: { type: String, default: 'cliente' }, // admin, editor, cliente
    activo: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', productoSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Destino = mongoose.model('Destino', destinoSchema);
const Testimonio = mongoose.model('Testimonio', testimonioSchema);
const Usuario = mongoose.model('Usuario', usuarioSchema);

// ===== RUTAS - PRODUCTOS =====

app.get('/api/productos', async (req, res) => {
    try {
        const { tipo, activo } = req.query;
        let query = {};

        if (tipo) query.tipo = tipo;
        if (activo !== undefined) query.activo = activo === 'true';

        const productos = await Producto.find(query);
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/productos', async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(producto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/productos/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== RUTAS - BLOG =====

app.get('/api/blog', async (req, res) => {
    try {
        const articulos = await Blog.find({ publicado: true }).sort({ createdAt: -1 });
        res.json(articulos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/blog', async (req, res) => {
    try {
        const articulo = new Blog(req.body);
        await articulo.save();
        res.status(201).json(articulo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/blog/:id', async (req, res) => {
    try {
        const articulo = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(articulo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/blog/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Artículo eliminado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== RUTAS - DESTINOS =====

app.get('/api/destinos', async (req, res) => {
    try {
        const destinos = await Destino.find();
        res.json(destinos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/destinos', async (req, res) => {
    try {
        const destino = new Destino(req.body);
        await destino.save();
        res.status(201).json(destino);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/destinos/:id', async (req, res) => {
    try {
        const destino = await Destino.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(destino);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/destinos/:id', async (req, res) => {
    try {
        await Destino.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Destino eliminado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== RUTAS - TESTIMONIOS =====

app.get('/api/testimonios', async (req, res) => {
    try {
        const testimonios = await Testimonio.find({ aprobado: true }).sort({ createdAt: -1 });
        res.json(testimonios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/testimonios', async (req, res) => {
    try {
        const testimonio = new Testimonio(req.body);
        await testimonio.save();
        res.status(201).json(testimonio);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== SALUD =====

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date(),
        mensaje: 'OKO TRAVELS Backend está funcionando'
    });
});

app.get('/', (req, res) => {
    res.json({
        nombre: 'OKO TRAVELS API',
        version: '1.0.0',
        endpoints: {
            productos: '/api/productos',
            blog: '/api/blog',
            destinos: '/api/destinos',
            testimonios: '/api/testimonios',
            health: '/api/health'
        }
    });
});

// ===== SERVIDOR =====

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║   🌍 OKO TRAVELS API INICIADO 🌍      ║
    ║   Puerto: ${PORT}                           ║
    ║   Entorno: ${process.env.NODE_ENV || 'desarrollo'}                ║
    ╚════════════════════════════════════════╝
    `);
});
