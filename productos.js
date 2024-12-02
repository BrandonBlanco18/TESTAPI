const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crear el esquema de Producto
const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { 
        type: Schema.Types.ObjectId, 
        ref: 'Categoria', // Referencia al modelo Categoria
        required: true 
    }
});

// Crear el modelo de Producto
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
