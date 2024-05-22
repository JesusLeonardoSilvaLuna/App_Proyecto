const mongoose = require('mongoose');

const EquipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  lider: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciclista', required: true, unique: true },
  integrantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ciclista' }]
});

// Middleware to ensure a ciclista can only belong to one team
EquipoSchema.pre('save', async function(next) {
  const team = this;
  const teamIntegrantes = await Equipo.find({ integrantes: { $in: team.integrantes } });
  if (teamIntegrantes.length > 0) {
    return next(new Error('Un ciclista solo puede pertenecer a un equipo.'));
  }
  next();
});

module.exports = mongoose.model('Equipo', EquipoSchema);