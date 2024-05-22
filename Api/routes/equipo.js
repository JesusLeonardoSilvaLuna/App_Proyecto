const express = require('express');
const router = express.Router();
const Equipo = require('../models/Equipo');
const Ciclista = require("../models/Ciclista");

// Crear un equipo
router.post('/crear', async (req, res) => {
    try {
      const { nombre, lider, integrantes } = req.body;
  
      // Verificar que el líder esté en la lista de integrantes
      if (!integrantes.includes(lider)) {
        return res.status(400).json({ message: 'El líder debe ser uno de los integrantes.' });
      }
  
      const equipo = new Equipo({ nombre, lider, integrantes });
      await equipo.save();
      res.status(201).json(equipo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Obtener todos los equipos
router.get('/obtener', async (req, res) => {
  try {
    const equipos = await Equipo.find().populate('lider').populate('integrantes');
    res.json(equipos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un equipo por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id).populate('lider').populate('integrantes');
    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.json(equipo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un equipo
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const { nombre, lider, integrantes } = req.body;

    // Verificar que el líder esté en la lista de integrantes
    if (lider && !integrantes.includes(lider)) {
      return res.status(400).json({ message: 'El líder debe ser uno de los integrantes.' });
    }

    const equipo = await Equipo.findByIdAndUpdate(
      req.params.id,
      { nombre, lider, integrantes },
      { new: true }
    );

    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.json(equipo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un equipo
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.json({ message: 'Equipo eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;