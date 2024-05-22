const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');

// Ruta para obtener todos los eventos
router.get('/obtener', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un nuevo evento
router.post('/crear', async (req, res) => {
  try {
    const nuevaEvento = await Evento.create(req.body); // Corregido: Utiliza Ruta.create en lugar de Ruta.create
    res.status(201).json(nuevaEvento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para obtener un evento por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para actualizar un evento por ID
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    Object.assign(evento, req.body);
    const eventoActualizado = await evento.save();
    res.json(eventoActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar un evento por ID
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    await evento.remove();
    res.json({ message: 'Evento eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;