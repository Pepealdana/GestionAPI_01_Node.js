const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); // la constante app tendrá ahora todo el funcionamiento del servidor
require('dotenv').config();          // ✅ primero carga .env
require('./database');               // ✅ luego conecta a Mongo

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev')); 
app.use(express.json()); // método que ayuda a convertir el código para que el servidor pueda entender lo que viene del cliente.
app.use(cors({origin: 'http://localhost:4200'})); // método para comunicar con el cliente

// rutas de nuestro servidor
app.use('/api/empleados',require('./routes/empleado.routes'));

// Iniciando el servidor
app.listen(app.get('port'), () => {// esta es una mejor manera de configurar el puerto
    console.log('server activo en el puerto', app.get('port'));
}); 
