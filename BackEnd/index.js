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

// Ruta base para todo lo relacionado con empleados
app.use('/api/empleados', require('./routes/empleado.routes'));

// Ruta base para todo lo relacionado con servicios
app.use('/api/servicios', require('./routes/servicio.routes'));

// Ruta base para todo lo relacionado con clientes
app.use('/api/usuarios', require('./routes/usuario.routes'));

// Ruta base para todo lo relacionado con productos
app.use('/api/productos', require('./routes/producto.routes'));

// Se lanza el servidor y se muestra el puerto activo en consola
app.listen(app.get('port'), () => {
    console.log('server activo en el puerto', app.get('port'));
});