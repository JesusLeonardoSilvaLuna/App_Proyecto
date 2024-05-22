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
    type: String, // Puedes almacenar la URL de la imagen o la ruta del archivo en el servidor
    required: true
  },
  categorias: [{
    nombre: String,
    distancia: String,
    descripcion: String
  }],
  rutas: [{
    nombre: String,
    distancia: Number, // Distancia en kilómetros
    puntosDeControl: [{
      latitud: Number,
      longitud: Number
    }]
  }]
});

module.exports = mongoose.model("Evento", EventoSchema)