const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de ciclista
const PuntajeSchema = new Schema({
    ciclistaId: { type: Schema.Types.ObjectId, required: true, ref: 'Ciclista' }, // Referencia al ID del usuario
    eventoId: { type: Schema.Types.ObjectId, required: true, ref: 'Evento' }, // Referencia al ID del evento
    tiempo: { type: Number, required: true }, // Tiempo en segundos
    distancia: { type: Number, required: true }, // Distancia recorrida en kilómetros
    fecha: { type: Date, default: Date.now }, // Fecha del evento
    posicion: { type: Number }, // Posición en la carrera
    elevationGain: { type: Number }, // Ganancia de elevación en metros
});

// Crea el modelo a partir del esquema
const Puntaje = mongoose.model('Puntaje', PuntajeSchema);

module.exports = Puntaje;