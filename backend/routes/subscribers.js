import express from 'express';
import Subscriber from '../models/Subscriber.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ===== SUSCRIBIRSE AL NEWSLETTER =====

router.post('/subscribe', async (req, res) => {
  try {
    const { email, name, interests } = req.body;

    // Validar email
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email es requerido'
      });
    }

    // Verificar si ya existe
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return res.status(400).json({
          success: false,
          error: 'Este email ya está suscrito'
        });
      } else {
        // Reactivar si estaba inactivo
        existingSubscriber.status = 'active';
        await existingSubscriber.save();
        return res.json({
          success: true,
          message: 'Suscripción reactivada exitosamente'
        });
      }
    }

    // Crear nuevo suscriptor
    const subscriber = await Subscriber.create({
      email,
      name,
      interests: interests || [],
      isConfirmed: true // Por ahora sin confirmación de email
    });

    res.status(201).json({
      success: true,
      message: '¡Gracias por suscribirse! Recibirás emails sobre nuestros mejores viajes.',
      data: subscriber
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ===== DESUSCRIBIRSE =====

router.post('/unsubscribe/:email', async (req, res) => {
  try {
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: req.params.email },
      { status: 'unsubscribed' },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: 'Email no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Te has desuscrito de nuestro newsletter'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== ACTUALIZAR PREFERENCIAS =====

router.put('/preferences/:email', async (req, res) => {
  try {
    const { interests } = req.body;

    const subscriber = await Subscriber.findOneAndUpdate(
      { email: req.params.email },
      { interests },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: 'Suscriptor no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Preferencias actualizadas exitosamente',
      data: subscriber
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ===== GET ESTADÍSTICAS (solo admin) =====

router.get('/stats/overview', protect, async (req, res) => {
  try {
    const totalSubscribers = await Subscriber.countDocuments({ status: 'active' });
    const totalUnsubscribed = await Subscriber.countDocuments({ status: 'unsubscribed' });

    const interestStats = await Subscriber.aggregate([
      { $match: { status: 'active' } },
      { $unwind: '$interests' },
      { $group: {
        _id: '$interests',
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalSubscribers,
        totalUnsubscribed,
        interestStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== GET LISTA DE SUSCRIPTORES (solo admin) =====

router.get('/list', protect, async (req, res) => {
  try {
    const { status, interest } = req.query;
    let query = {};

    if (status) query.status = status;
    if (interest) query.interests = interest;

    const subscribers = await Subscriber.find(query)
      .sort({ createdAt: -1 })
      .select('-confirmationToken');

    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
