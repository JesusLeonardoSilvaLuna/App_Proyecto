const mongoose = require('mongoose');

const JuezSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  especialidad: String, // Puede ser 'carreras de ruta', 'carreras de montaña', etc.
  contacto: {
    nombre: String,
    telefono: String,
    email: String
  }
});

const Juez = mongoose.model('Juez', JuezSchema);

module.exports = Juez;