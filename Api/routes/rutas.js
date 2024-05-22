const express = require('express');
const router = express.Router();
const Ruta = require('../models/Rutas'); 

// Crear una ruta
router.post('/crear', async (req, res) => {
    try {
      const nuevaRuta = await Ruta.create(req.body); // Corregido: Utiliza Ruta.create en lugar de Ruta.create
      res.status(201).json(nuevaRuta);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Obtener todas las rutas
router.get('/obtener', async (req, res) => {
  try {
    const rutas = await Ruta.find();
    res.json(rutas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una ruta por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const ruta = await Ruta.findById(req.params.id);
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.json(ruta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una ruta
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const ruta = await Ruta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.json(ruta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una ruta
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const ruta = await Ruta.findByIdAndDelete(req.params.id);
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.json({ message: 'Ruta eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;