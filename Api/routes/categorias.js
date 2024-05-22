const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria'); // Asegúrate de que esta ruta es correcta

// Crear una categoría
router.post('/crear', async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todas las categorías
router.get('/obtener', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una categoría por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una categoría
router.patch('/actualizar/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una categoría
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function cleanUpCategorias() {
  try {
    // Encuentra todas las categorías con nombre null o duplicado
    const categorias = await Categoria.find({ nombre: { $in: [null, ''] } });
    for (const categoria of categorias) {
      // Elimina o corrige estas categorías
      await Categoria.findByIdAndDelete(categoria._id);
    }

    // Aquí puedes agregar más lógica para manejar duplicados si es necesario
  } catch (err) {
    console.error('Error limpiando categorías:', err);
  }
}

cleanUpCategorias();

module.exports = router;
