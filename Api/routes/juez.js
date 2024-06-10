const express = require('express');
const router = express.Router();
const Juez = require('../models/Juez');

// Crear un juez
router.post('/crear', async (req, res) => {
  try {
    const juez = await Juez.create(req.body);
    res.status(201).json(juez);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los jueces
router.get('/obtener', async (req, res) => {
  try {
    const jueces = await Juez.find();
    res.json(jueces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un juez por ID
router.get('/obtener:id', async (req, res) => {
  try {
    const juez = await Juez.findById(req.params.id);
    if (!juez) {
      return res.status(404).json({ message: 'Juez no encontrado' });
    }
    res.json(juez);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un juez
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const juez = await Juez.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!juez) {
      return res.status(404).json({ message: 'Juez no encontrado' });
    }
    res.json(juez);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un juez
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const juez = await Juez.findByIdAndDelete(req.params.id);
    if (!juez) {
      return res.status(404).json({ message: 'Juez no encontrado' });
    }
    res.json({ message: 'Juez eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;