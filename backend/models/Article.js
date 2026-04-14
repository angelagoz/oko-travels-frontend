import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  // Información básica
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },

  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [300, 'La descripción no puede exceder 300 caracteres']
  },

  content: {
    type: String,
    required: [true, 'El contenido es requerido']
  },

  category: {
    type: String,
    enum: ['cruceros', 'playas', 'parques', 'hoteles', 'destinos'],
    required: true
  },

  tags: {
    type: [String],
    default: []
  },

  // Imágenes
  featuredImage: {
    type: String,
    required: false
  },

  gallery: {
    type: [String],
    default: []
  },

  // SEO
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],

  // Información de viaje
  travelTips: {
    type: [String],
    default: []
  },

  bestSeason: String,

  priceRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },

  // Control
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  published: {
    type: Boolean,
    default: false
  },

  views: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate slug from title
articleSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  this.updatedAt = Date.now();
  next();
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
