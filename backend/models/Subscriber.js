import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },

  name: {
    type: String,
    required: false
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'unsubscribed'],
    default: 'active'
  },

  source: {
    type: String,
    enum: ['website', 'form', 'import'],
    default: 'website'
  },

  interests: {
    type: [String],
    enum: ['cruceros', 'playas', 'parques', 'hoteles'],
    default: []
  },

  confirmationToken: String,
  confirmationTokenExpires: Date,
  isConfirmed: {
    type: Boolean,
    default: false
  },

  lastEmailSent: Date,
  emailCount: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-update timestamp
subscriberSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
