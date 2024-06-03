const express = require('express');
const router = express.Router();
const Juez = require('../models/Juez');
const Ciclista = require('../models/Ciclista');
const Puntaje = require('../models/Juez')

// Crear un nuevo juez
router.post('/crearJuez', async (req, res) => {
  try {
    const juez = new Juez(req.body);
    await juez.save();
    res.status(201).json(juez);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Otorgar un puntaje a un ciclista
router.post('/juez/:juezId/puntuar', async (req, res) => {
  try {
    const { juezId } = req.params;
    const { ciclistaId, puntaje, comentario } = req.body;

    // Verificar que el juez existe
    const juez = await Juez.findById(juezId);
    if (!juez) {
      return res.status(404).json({ message: 'Juez no encontrado' });
    }

    // Verificar que el ciclista existe
    const ciclista = await Ciclista.findById(ciclistaId);
    if (!ciclista) {
      return res.status(404).json({ message: 'Ciclista no encontrado' });
    }

    // Crear un nuevo puntaje
    const nuevoPuntaje = {
      ciclista: ciclistaId,
      puntaje,
      comentario
    };

    // Añadir el nuevo puntaje al juez
    juez.puntajes.push(nuevoPuntaje);
    await juez.save();

    res.status(201).json(juez);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para obtener los ciclistas calificados
router.get('/calificados', async (req, res) => {
  try {
    const calificados = await Puntaje.find().populate('ciclistaId').populate('juezId');
    res.json(calificados);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;