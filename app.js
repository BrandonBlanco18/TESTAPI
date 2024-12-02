const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');  // Asegúrate de que el archivo routes.js esté correctamente importado

// Crear la aplicación Express
const app = express();

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/inventario', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log('Error al conectar a la base de datos', err));

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', routes);  // Asegúrate de que las rutas estén siendo utilizadas en el prefijo '/api'

// Iniciar el servidor
const PORT = process.env.PORT || 2707;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
