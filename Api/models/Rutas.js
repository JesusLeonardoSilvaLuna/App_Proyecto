const mongoose = require('mongoose');

const RutaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  distancia: {
    type: Number,
    required: true
  },
  puntosDeControl: [String], 
  dificultad: String, 
  descripcion: String,
  coordenadas: {
    type: [{ type: Number }], // [Longitud, Latitud]
    required: true
  }
});

const Ruta = mongoose.model('Ruta', RutaSchema);

module.exports = Ruta;