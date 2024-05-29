const express = require('express');
const router = express.Router();
const Inscripciones = require('../models/Inscripciones');

// Crear un inscripcion
router.post('/crear', async (req, res) => {
  try {
    const inscripcion = await Inscripciones.create(req.body);
    res.status(201).json(inscripcion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los inscripcion
router.get('/obtener', async (req, res) => {
  try {
    const inscripcion = await Inscripciones.find();
    res.json(inscripcion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un inscripcion por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const inscripcion = await Inscripciones.findById(req.params.id);
    if (!inscripcion) {
      return res.status(404).json({ message: 'inscripcion no encontrado' });
    }
    res.json(inscripcion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un inscripcion
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const inscripcion = await Inscripciones.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inscripcion) {
      return res.status(404).json({ message: 'inscripcion no encontrado' });
    }
    res.json(inscripcion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una inscripcion
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const inscripcion = await Inscripciones.findByIdAndDelete(req.params.id);
    if (!inscripcion) {
      return res.status(404).json({ message: 'inscripcion no encontrado' });
    }
    res.json({ message: 'inscripcion eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;