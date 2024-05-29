const express = require('express');
const router = express.Router();
const News = require('../models/Noticias');
const upload = require('../multer-config'); // Asegúrate de que el camino sea correcto

// Crear una noticia
router.post('/crear', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const news = new News({
      title,
      content,
      image: req.file ? req.file.path : null,
    });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todas las noticias
router.get('/obtener', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una noticia por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una noticia por ID
router.put('/actualizar/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedData = { title, content };
    if (req.file) {
      updatedData.image = req.file.path;
    }
    await News.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: 'Noticia actualizada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar una noticia por ID
router.delete('/eliminar/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'Noticia eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;