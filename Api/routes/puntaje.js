const express = require('express');
const router = express.Router();
const puntajeController = require('../controllers/puntajeController');

// Ruta para crear un nuevo puntaje
router.post('/crear', puntajeController.crearPuntaje);

// Ruta para actualizar un puntaje por ID
router.patch('/actualizar/:id', puntajeController.actualizarPuntaje);

// Ruta para obtener puntajes por evento
router.get('/eventos/:eventoId', puntajeController.obtenerPuntajesPorEvento);

// Ruta para obtener puntaje de un ciclista en un evento
router.get('/ciclista/:ciclistaId/evento/:eventoId', puntajeController.obtenerPuntajePorCiclistaEnEvento);

module.exports = router;