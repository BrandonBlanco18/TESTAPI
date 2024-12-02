const express = require('express');
const router = express.Router();

// Importar los controladores
const productoController = require('./controllers/productoController');
const categoriaController = require('./controllers/categoriaController');

// Rutas para productos
router.post('/productos', productoController.crearProducto);
router.get('/productos', productoController.obtenerProductos);
router.put('/productos/:id', productoController.actualizarProducto);
router.delete('/productos/:id', productoController.eliminarProducto);

// Rutas para categorías
router.post('/categoria', categoriaController.crearCategoria);
router.get('/categoria', categoriaController.obtenerCategorias);
router.get('/categoria/:id', categoriaController.obtenerCategoriaPorId);
router.put('/categoria/:id', categoriaController.actualizarCategoria);
router.delete('/categoria/:id', categoriaController.eliminarCategoria);

module.exports = router;
