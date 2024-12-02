const mongoose = require('mongoose');
const express = require('express');
const app = express();
const routes = require('./routes'); // Importar rutas
const bodyParser = require('body-parser');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/inventario', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log('Error al conectar a la base de datos', err));

app.use(express.json()); // Middleware para parsear JSON

// Usar las rutas definidas en 'routes.js'
app.use('/api', routes); // Redirigir todas las rutas a '/api'

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
