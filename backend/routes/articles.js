import express from 'express';
import Article from '../models/Article.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ===== GET ENDPOINTS =====

// GET todos los artículos publicados
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = { published: true };

    // Filtrar por categoría
    if (category && category !== 'todos') {
      query.category = category;
    }

    // Buscar por título o tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Ordenar
    let sortOption = { createdAt: -1 };
    if (sort === 'titulo') sortOption = { title: 1 };
    if (sort === 'popularidad') sortOption = { views: -1 };

    const articles = await Article.find(query)
      .sort(sortOption)
      .select('-content'); // No incluir contenido largo en listado

    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET artículo por ID o slug
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findOne({
      $or: [
        { _id: req.params.id },
        { slug: req.params.id }
      ]
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Artículo no encontrado'
      });
    }

    // Incrementar views
    article.views += 1;
    await article.save();

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== POST ENDPOINTS =====

// POST crear nuevo artículo (solo admin)
router.post('/', protect, async (req, res) => {
  try {
    // Validar datos requeridos
    const { title, description, content, category } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos'
      });
    }

    const article = new Article(req.body);
    await article.save();

    res.status(201).json({
      success: true,
      message: 'Artículo creado exitosamente',
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ===== PUT ENDPOINTS =====

// PUT actualizar artículo
router.put('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Artículo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Artículo actualizado exitosamente',
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ===== DELETE ENDPOINTS =====

// DELETE eliminar artículo
router.delete('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Artículo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Artículo eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== UTILITY ENDPOINTS =====

// GET artículos por categoría con estadísticas
router.get('/stats/categories', async (req, res) => {
  try {
    const stats = await Article.aggregate([
      { $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }},
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
