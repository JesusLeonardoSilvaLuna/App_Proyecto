const mongoose = require('mongoose');

const OrganizadorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  contacto: {
    nombre: String,
    telefono: String,
    email: String
  }
});

const Organizador = mongoose.model('Organizador', OrganizadorSchema);

module.exports = Organizador;