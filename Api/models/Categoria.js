// /home/jimena/App/backend/models/Categoria.js
const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  edadMinima: Number,
  edadMaxima: Number,
  sexo: String, 
  nivel: String 
});

module.exports = mongoose.model('Categoria', CategoriaSchema);