const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de ciclista
const PuntajeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Referencia al ID del usuario
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' }, // Referencia al ID del evento
    time: { type: Number, required: true }, // Tiempo en segundos
    distance: { type: Number, required: true }, // Distancia recorrida en kilómetros
    averageSpeed: { type: Number, required: true }, // Velocidad media en km/h
    date: { type: Date, default: Date.now }, // Fecha del evento
    position: { type: Number }, // Posición en la carrera
    elevationGain: { type: Number }, // Ganancia de elevación en metros
});

// Crea el modelo a partir del esquema
const Puntaje = mongoose.model('Puntaje', PuntajeSchema);

module.exports = Puntaje;