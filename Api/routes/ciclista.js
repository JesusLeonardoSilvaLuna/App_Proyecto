// /home/jimena/App/backend/routes/ciclista.js
const express = require('express');
const router = express.Router();
const Ciclista = require('../models/Ciclista');

// Crear un ciclista
router.post('/crear', async (req, res) => {
  try {
    const ciclista = await Ciclista.create(req.body);
    res.status(201).json(ciclista);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los ciclistas
router.get('/obtener', async (req, res) => {
  try {
    const ciclistas = await Ciclista.find();
    res.json(ciclistas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un ciclista por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const ciclista = await Ciclista.findById(req.params.id);
    if (!ciclista) {
      return res.status(404).json({ message: 'Ciclista no encontrado' });
    }
    res.json(ciclista);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un ciclista
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const ciclista = await Ciclista.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ciclista) {
      return res.status(404).json({ message: 'Ciclista no encontrado' });
    }
    res.json(ciclista);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un ciclista
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const ciclista = await Ciclista.findByIdAndDelete(req.params.id);
    if (!ciclista) {
      return res.status(404).json({ message: 'Ciclista no encontrado' });
    }
    res.json({ message: 'Ciclista eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;