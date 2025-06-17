const mongoose = require('mongoose');
require('dotenv').config(); // para leer .env
const URI = process.env.MONGO_URI; // usa la variable del .env
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar MongoDB:', err));

module.exports = mongoose;
