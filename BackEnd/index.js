// Archivo principal del servidor backend
// Se configura y arranca el servidor Express
// Se definen las funciones, la conexión a la base de datos y las rutas

// módulos necesarios
const express = require('express');              // Framework para crear el servidor web
const morgan = require('morgan');                // Muestra las peticiones HTTP en consola
const cors = require('cors');                    // Permite la comunicación entre el backend y el frontend
require('dotenv').config();                      // Carga variables desde el archivo .env
require('./database');                           // Activa la conexión con MongoDB

const app = express(); // la constante app tendrá ahora todo el funcionamiento del servidor

// Configuración del servidor
app.set('port', process.env.PORT || 3000);       // Asigna el puerto, por defecto el 3000
app.use(morgan('dev'));                          // Muestra logs de las peticiones
app.use(express.json());                         // Permite interpretar las peticiones JSON del cliente
app.use(cors({origin: 'http://localhost:4200'}));// Habilita el acceso desde el frontend (Angular, por ejemplo)

// Rutas
app.use('/api/empleados', require('./routes/empleado.routes'));
app.use('/api/servicios', require('./routes/servicio.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// Solo levantar el servidor si no está en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log('server activo en el puerto', app.get('port'));
    });
}

// Exportamos app para Supertest
module.exports = app;
