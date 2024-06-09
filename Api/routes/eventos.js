// routes/eventos.js
const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');
const upload = require('../multer-config'); // Asegúrate de que el camino sea correcto

router.post('/crear', upload.single('imagen'), async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debugging
    console.log('File info:', req.file); // Debugging

    const { nombre, fecha, lugar, categorias, rutas } = req.body;

    if (!nombre || !fecha || !lugar || !categorias || !rutas) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const parsedCategorias = JSON.parse(categorias);
    const parsedRutas = JSON.parse(rutas);

    if (!Array.isArray(parsedCategorias) || !Array.isArray(parsedRutas)) {
      return res.status(400).json({ message: 'Categorias y rutas deben ser arreglos' });
    }

    const evento = new Evento({
      nombre,
      fecha,
      lugar,
      imagen: req.file.path,
      categorias: parsedCategorias,
      rutas: parsedRutas,
    });

    await evento.save();
    res.status(201).json(evento);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ message: 'Error al crear el evento', error: error.message });
  }
});


// Ruta para obtener todos los eventos con categorías y rutas pobladas
router.get('/obtenerEventos', async (req, res) => {
  try {
    const eventos = await Evento.find().populate('categorias').populate('rutas');
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Ruta para obtener un evento por ID con categorías y rutas pobladas
router.get('/obtenerEventos/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('categorias').populate('rutas');
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener todos los eventos con ciclistas inscritos
router.get('/obtener', async (req, res) => {
  try {
    const eventos = await Evento.find().populate('ciclistas');
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener un evento por ID con categorías y rutas pobladas
router.get('/obtener/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('ciclistas');
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para actualizar un evento por ID
router.patch('/actualizar/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, fecha, lugar, categorias, rutas } = req.body;

    const updatedData = {
      nombre,
      fecha,
      lugar,
      categorias: JSON.parse(categorias),
      rutas: JSON.parse(rutas),
    };

    if (req.file) {
      updatedData.imagen = req.file.path;
    }

    const updatedEvent = await Evento.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    res.status(500).json({ error: 'Error al actualizar el evento' });
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