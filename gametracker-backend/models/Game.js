const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  plataforma: { type: String, required: true },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  imagen: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);