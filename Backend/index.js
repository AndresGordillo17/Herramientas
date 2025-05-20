// index.js

const express = require('express'); 
const cors = require('cors');

const app = express(); 
const PORT = 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Hola mundo!');
});

app.get('/ping', (req, res) => {
  res.json({ respuesta: 'Andres Tituaña' }); 
});

// Escuchar en 0.0.0.0 para permitir conexiones externas
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
