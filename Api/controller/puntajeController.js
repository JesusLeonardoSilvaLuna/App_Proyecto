const Puntaje = require('../models/Puntaje');
const Ciclista = require('../models/Ciclista');
const Evento = require('../models/Evento');

// Crear puntaje para un ciclista en un evento
exports.crearPuntaje = async (req, res) => {
  try {
    const { ciclistaId, eventoId, tiempo, distancia, posicion, elevationGain } = req.body;

    // Verificar si el ciclista y el evento existen
    const ciclista = await Ciclista.findById(ciclistaId);
    const evento = await Evento.findById(eventoId);

    if (!ciclista || !evento) {
      return res.status(404).json({ message: 'Ciclista o evento no encontrado' });
    }

    const nuevoPuntaje = new Puntaje({
      ciclistaId,
      eventoId,
      tiempo,
      distancia,
      posicion,
      elevationGain
    });

    await nuevoPuntaje.save();
    res.status(201).json(nuevoPuntaje);
  } catch (error) {
    console.error('Error al crear el puntaje:', error);
    res.status(500).json({ message: 'Error al crear el puntaje' });
  }
};

// Actualizar puntaje de un ciclista en un evento
exports.actualizarPuntaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { tiempo, distancia, posicion, elevationGain } = req.body;

    const puntajeActualizado = await Puntaje.findByIdAndUpdate(
      id,
      { tiempo, distancia, posicion, elevationGain },
      { new: true }
    );

    if (!puntajeActualizado) {
      return res.status(404).json({ message: 'Puntaje no encontrado' });
    }

    res.status(200).json(puntajeActualizado);
  } catch (error) {
    console.error('Error al actualizar el puntaje:', error);
    res.status(500).json({ message: 'Error al actualizar el puntaje' });
  }
};

// Obtener puntajes de un evento
exports.obtenerPuntajesPorEvento = async (req, res) => {
  try {
    const { eventoId } = req.params;

    const puntajes = await Puntaje.find({ eventoId }).populate('ciclistaId');

    if (!puntajes.length) {
      return res.status(404).json({ message: 'No se encontraron puntajes para este evento' });
    }

    res.status(200).json(puntajes);
  } catch (error) {
    console.error('Error al obtener los puntajes:', error);
    res.status(500).json({ message: 'Error al obtener los puntajes' });
  }
};

// Obtener puntajes de un ciclista en un evento
exports.obtenerPuntajePorCiclistaEnEvento = async (req, res) => {
  try {
    const { ciclistaId, eventoId } = req.params;

    const puntaje = await Puntaje.findOne({ ciclistaId, eventoId });

    if (!puntaje) {
      return res.status(404).json({ message: 'Puntaje no encontrado para este ciclista en este evento' });
    }

    res.status(200).json(puntaje);
  } catch (error) {
    console.error('Error al obtener el puntaje:', error);
    res.status(500).json({ message: 'Error al obtener el puntaje' });
  }
};