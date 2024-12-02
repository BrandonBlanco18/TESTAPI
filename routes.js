const express = require('express');
const router = express.Router();  // Aquí definimos 'router'

// Importar los controladores
const productoController = require('./controllers/productoController');
const categoriaController = require('./controllers/categoriaController');

// Rutas para productos
router.post('/productos', productoController.crearProducto);
router.get('/productos', productoController.obtenerProductos);
router.delete('/productos/:id', productoController.eliminarProducto);

// Rutas para categorías
router.post('/categoria', categoriaController.crearCategoria);
router.get('/categoria', categoriaController.obtenerCategorias);

module.exports = router;
