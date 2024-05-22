const express = require('express');
const router = express.Router();
const News = require('../models/Noticias');

router.post('/crear', async (req, res) => {
    try {
      const noticias = req.body; // Array de noticias
      const noticiasCreadas = await News.create(noticias);
      res.status(201).json(noticiasCreadas);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Obtener todas las noticias
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una noticia por ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una noticia por ID
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { title, content, image } = req.body;
    await News.findByIdAndUpdate(req.params.id, { title, content, image });
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
