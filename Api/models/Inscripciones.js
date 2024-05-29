const mongoose = require('mongoose');

const InscripcionSchema = new mongoose.Schema({
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
  },
  estado: { type: String, enum: ['Pendiente', 'Aceptada', 'Rechazada', 'Cancelada'] },
  evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento', required: false },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: false }
});

module.exports = mongoose.model('Inscripciones', InscripcionSchema);