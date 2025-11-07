require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const gamesRoutes = require('./routes/games');
const resenaRoutes = require('./routes/resenas');

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Conectar primero a MongoDB
const user = process.env.MONGO_USER;
const pass = encodeURIComponent(process.env.MONGO_PASS);
const cluster = process.env.MONGO_CLUSTER;
const dbName = process.env.MONGO_DB || 'gametracker';
const MONGO_URI = `mongodb+srv://${user}:${pass}@${cluster}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err.message));

// debug logger temporal - ponlo antes de app.use(...) de tus rutas
app.use((req, res, next) => {
  console.log('>>> REQUEST:', req.method, req.originalUrl);
  next();
});


// 🔹 Después de la conexión, cargar las rutas
app.use('/api/games', gamesRoutes);
app.use('/api/resenas', resenaRoutes);

// 🔹 Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Node.js está funcionando!!');
});

// 🔹 Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});


