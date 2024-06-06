const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de puntaje
const ScoreSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Referencia al ID del usuario
    gameId: { type: Schema.Types.ObjectId, required: true, ref: 'Game' }, // Referencia al ID del juego
    score: { type: Number, required: true }, // Puntaje obtenido
    date: { type: Date, default: Date.now }, // Fecha del puntaje
    level: { type: Number, required: true }, // Nivel alcanzado
    duration: { type: Number, required: true }, // Duración de la partida en segundos
});

// Crea el modelo a partir del esquema
const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;