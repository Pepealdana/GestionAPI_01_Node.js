// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./database');

const app = express();

// Configuración
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Rutas
app.use('/api/empleados', require('./routes/empleado.routes'));
app.use('/api/servicios', require('./routes/servicio.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;
