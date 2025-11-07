const express = require('express');
const router = express.Router();
const Resena = require('../models/Resena');

// 📍 GET: Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const resenas = await Resena.find().populate('juegoId', 'titulo plataforma');
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error });
  }
});

// 📍 POST: Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const nuevaResena = new Resena(req.body);
    const resenaGuardada = await nuevaResena.save();
    res.status(201).json(resenaGuardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar la reseña', error });
  }
});

// 📍 PUT: Actualizar una reseña
router.put('/:id', async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(resenaActualizada);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la reseña', error });
  }
});

// 📍 DELETE: Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    await Resena.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la reseña', error });
  }
});

module.exports = router;