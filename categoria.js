const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crear el esquema de Categoria
const categoriaSchema = new Schema({
    nombre: { type: String, required: true }
});

// Crear el modelo de Categoria
const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
