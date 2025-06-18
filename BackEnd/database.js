const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_URI;

if (!URI) {
  console.error('❌ MONGO_URI no está definido.');
  process.exit(1);
}

mongoose.connect(URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar MongoDB:', err));
