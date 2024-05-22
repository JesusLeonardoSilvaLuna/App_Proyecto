const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String // Ruta de la imagen almacenada en el servidor o en la nube
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;