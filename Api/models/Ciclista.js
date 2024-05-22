const mongoose = require('mongoose');

const CiclistaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  edad: { type: Number, required: true },
  genero: { type: String, required: true, enum: ['Masculino', 'Femenino', 'Otro'] },
  direccion: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  numero: { type: String, required: true },
  seguroSocial: { type: String, required: true, unique: true },
  contactoEmergencia: {
    nombre: { type: String, required: true },
    numero: { type: String, required: true }
  }
});

module.exports = mongoose.model('Ciclista', CiclistaSchema);
  