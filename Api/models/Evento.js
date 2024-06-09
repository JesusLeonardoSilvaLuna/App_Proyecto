const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  lugar: {
    type: String,
    required: true
  },
  imagen: {
    type: String, 
    required: false
  },
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }],
  rutas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ruta'
  }],
  ciclistas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ciclista'
  }]
});

module.exports = mongoose.model("Evento", EventoSchema);