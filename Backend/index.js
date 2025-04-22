console.log('hola mundo')
// index.js
const express = require('express');
const app = express();

// Puerto del servidor
const PORT = 3030;

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

app.get('/ping', (req, res) => {
  res.status(200).json(
    {
      message:'pong'
    }
  )
});
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


