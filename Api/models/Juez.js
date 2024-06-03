const mongoose = require('mongoose');
const Ciclista = require('./Ciclista'); // Asegúrate de que el camino es correcto

// Esquema de Puntaje
const PuntajeSchema = new mongoose.Schema({
  ciclista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Ciclista,
    required: true
  },
  puntaje: {
    type: Number,
    required: true,
    min: 0, // Asumiendo que el puntaje no puede ser negativo
    max: 100 // Puedes ajustar esto según tus necesidades
  },
  comentario: String // Opcional, comentarios del juez sobre el ciclista
});

// Esquema de Juez
const JuezSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  especialidad: {
    type: String,
    enum: ['carreras de ruta', 'carreras de montaña', 'otro'],
    required: true
  },
  contacto: {
    nombre: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  puntajes: [PuntajeSchema] // Array de puntajes otorgados
});

const Juez = mongoose.model('Juez', JuezSchema);

module.exports = Juez;