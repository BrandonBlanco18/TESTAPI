const mongoose = require('mongoose');

// Esquema para inventario
const inventarioSchema = new mongoose.Schema({
    tipo: { type: String, enum: ['entrada', 'salida'], required: true },
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventario', inventarioSchema);
