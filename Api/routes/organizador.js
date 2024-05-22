const express = require('express');
const router = express.Router();
const Organizador = require('../models/Organizador');

// Crear un organizador
router.post('/crear', async (req, res) => {
  try {
    const organizador = await Organizador.create(req.body);
    res.status(201).json(organizador);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los organizadores
router.get('/obtener', async (req, res) => {
  try {
    const organizadores = await Organizador.find();
    res.json(organizadores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un organizador por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const organizador = await Organizador.findById(req.params.id);
    if (!organizador) {
      return res.status(404).json({ message: 'Organizador no encontrado' });
    }
    res.json(organizador);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un organizador
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const organizador = await Organizador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!organizador) {
      return res.status(404).json({ message: 'Organizador no encontrado' });
    }
    res.json(organizador);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un organizador
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const organizador = await Organizador.findByIdAndDelete(req.params.id);
    if (!organizador) {
      return res.status(404).json({ message: 'Organizador no encontrado' });
    }
    res.json({ message: 'Organizador eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;