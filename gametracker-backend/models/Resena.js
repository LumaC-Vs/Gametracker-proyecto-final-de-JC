const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
    juegoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    puntuacion: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    textoResena: {
        type: String,
        default: ''
    },
    horasJugadas: {
        type: Number,
        default: 0
    },
    dificultad: {
        type: String,
        enum: ['Fácil', 'Normal', 'Difícil'],
        default: 'Normal' // 👈 corregido aquí
    },
    recomendaria: {
        type: Boolean,
        required: true 
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Resena', resenaSchema);
