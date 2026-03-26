/* ========================================
   RUTAS: PRODUCTOS (Cruceros, Tours, Disney)
   ======================================== */

const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// ========================================
// GET - LISTAR PRODUCTOS POR TIPO
// ========================================

router.get('/tipo/:tipo', async (req, res) => {
    try {
        const { tipo } = req.params;
        const productos = await Producto.find({
            tipo: tipo,
            estado: 'activo'
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            cantidad: productos.length,
            datos: productos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// GET - LISTAR TODOS LOS PRODUCTOS
// ========================================

router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find({ estado: 'activo' }).sort({ createdAt: -1 });

        res.json({
            success: true,
            cantidad: productos.length,
            datos: productos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// GET - OBTENER UN PRODUCTO POR ID
// ========================================

router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            datos: producto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// POST - CREAR PRODUCTO
// ========================================

router.post('/', async (req, res) => {
    try {
        const { nombre, tipo, precio_base, destino, descripcion } = req.body;

        if (!nombre || !tipo || !precio_base) {
            return res.status(400).json({
                success: false,
                error: 'Faltan campos requeridos'
            });
        }

        const producto = new Producto({
            nombre,
            tipo,
            precio_base,
            destino,
            descripcion,
            fotos: []
        });

        await producto.save();

        res.status(201).json({
            success: true,
            mensaje: 'Producto creado correctamente',
            productoId: producto._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// PUT - ACTUALIZAR PRODUCTO
// ========================================

router.put('/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            mensaje: 'Producto actualizado',
            datos: producto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// DELETE - ELIMINAR PRODUCTO
// ========================================

router.delete('/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            mensaje: 'Producto eliminado'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// POST - AGREGAR FOTO A PRODUCTO
// ========================================

router.post('/:id/fotos', async (req, res) => {
    try {
        const { url, titulo, orden } = req.body;

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    fotos: { url, titulo, orden: orden || 0 }
                }
            },
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            mensaje: 'Foto agregada correctamente',
            datos: producto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
