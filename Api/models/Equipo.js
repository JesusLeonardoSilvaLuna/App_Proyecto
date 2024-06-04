const mongoose = require('mongoose');

const EquipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  lider: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciclista' },
  integrantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ciclista' }],
  imagen: { type: String } // Campo para la URL de la imagen del equipo
});

// Middleware para asegurar que un ciclista solo pueda pertenecer a un equipo una vez
EquipoSchema.pre('save', async function(next) {
  const team = this;
  const teamIntegrantes = await mongoose.model('Equipo').find({ integrantes: { $in: team.integrantes } });
  if (teamIntegrantes.length > 0) {
    return next(new Error('Un ciclista solo puede pertenecer a un equipo.'));
  }
  next();
});

module.exports = mongoose.model('Equipo', EquipoSchema);