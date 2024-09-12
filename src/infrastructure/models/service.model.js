const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
});

const ServiceModel = mongoose.model('Service', serviceSchema);

module.exports = ServiceModel;
