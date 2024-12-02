// models/Cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    // ... otros campos
});

module.exports = mongoose.model('Cliente', clienteSchema);