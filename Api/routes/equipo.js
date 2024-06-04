const express = require('express');
const router = express.Router();
const Equipo = require('../models/Equipo');
const Ciclista = require('../models/Ciclista');
const upload = require('../multer-config'); // Asegúrate de que el camino sea correcto
 
// Crear un equipo
router.post('/crear', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, lider } = req.body;
    const integrantes = Array.isArray(req.body.integrantes) ? req.body.integrantes : [req.body.integrantes];
    const imagen = req.file ? req.file.path : null;

    // Verificar si el líder es un ciclista existente
    if (lider && !(await Ciclista.findById(lider))) {
      return res.status(400).json({ message: 'El líder no es un ciclista válido.' });
    }

    const equipo = new Equipo({ nombre, lider, integrantes, imagen });
    await equipo.save();
    res.status(201).json(equipo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todas las noticias
router.get('/obtener', async (req, res) => {
  try {
    const news = await Equipo.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una noticia por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const news = await Equipo.findById(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Actualizar un equipo
router.patch('/actualizar/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, lider } = req.body;
    const integrantes = Array.isArray(req.body.integrantes) ? req.body.integrantes : [req.body.integrantes];
    const updatedData = { nombre, lider, integrantes };

    // Verificar si el líder es un ciclista existente
    if (lider && !(await Ciclista.findById(lider))) {
      return res.status(400).json({ message: 'El líder no es un ciclista válido.' });
    }

    if (req.file) {
      updatedData.imagen = req.file.path;
    }

    const equipo = await Equipo.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.json(equipo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;