// index.js
const express = require('express');
const app = express();

// Puerto del servidor
const PORT = 3030;

// Datos de ejemplo
const libros = [
  { id: 1, titulo: "adc", autor: "Andres" },
  { id: 2, titulo: "cgfs", autor: "Jose" },
  { id: 3, titulo: "sfdsd", autor: "Guamy" },
];

// Ruta para obtener los libros
app.get('/libros', (req, res) => {
  res.json(libros);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
