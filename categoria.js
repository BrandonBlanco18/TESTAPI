const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Verificar si el modelo ya está definido
const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String
    }
});

// Si el modelo 'Categoria' ya existe, usarlo, si no, crearlo
const Categoria = mongoose.models.Categoria || mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
