const express = require('express');
const router = express.Router();
const Juez = require('../models/Juez'); // Asegúrate de que el camino sea correcto
const { Evento, Ciclista } = require('../models/Evento');

router.post('/:juezId/puntuar', async (req, res) => {
  const { juezId } = req.params;
  const { eventoId, ciclistaId, puntaje, comentario } = req.body;

  try {
    const juez = await Juez.findById(juezId);
    if (!juez) {
      return res.status(404).json({ message: 'Juez no encontrado' });
    }

    const nuevoPuntaje = {
      evento: eventoId,
      ciclista: ciclistaId,
      puntaje,
      comentario
    };

    juez.puntajes.push(nuevoPuntaje);
    await juez.save();

    res.status(201).json({ message: 'Puntaje otorgado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al otorgar puntaje' });
  }
});

module.exports = router;