const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Resena = require('../models/Resena');

// 📍 GET: Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 }); // Los más recientes primero
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los juegos', error });
  }
});

// 📍 GET: Obtener un juego específico por ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el juego', error });
  }
});

// 📘 GET: Obtener reseñas de un juego específico
router.get('/:id/resenas', async (req, res) => {
  try {
    const resenas = await Resena.find({ juegoId: req.params.id }).sort({ createdAt: -1 });
    res.json(resenas); // Devuelve array vacío si no hay reseñas
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas del juego', error });
  }
});

// 📍 POST: Crear un nuevo juego
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Game(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar el juego', error: error.message });
  }
});

// 📍 PUT: Actualizar un juego existente
router.put('/:id', async (req, res) => {
  try {
    const juegoActualizado = await Game.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!juegoActualizado) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el juego', error: error.message });
  }
});

// 📍 DELETE: Eliminar un juego (y sus reseñas asociadas)
router.delete('/:id', async (req, res) => {
  try {
    const juegoEliminado = await Game.findByIdAndDelete(req.params.id);
    if (!juegoEliminado) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    
    // Eliminar también todas las reseñas asociadas a este juego
    await Resena.deleteMany({ juegoId: req.params.id });
    
    res.json({ 
      message: 'Juego y sus reseñas eliminados correctamente',
      juego: juegoEliminado
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el juego', error: error.message });
  }
});

module.exports = router;