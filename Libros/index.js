const express = require('express');
const app = express();

app.use(express.json()); // Permite leer JSON en el body de las peticiones

const PORT = 8080;

// Datos de ejemplo (base de datos temporal en memoria)
let libros = [
  { id: 1, titulo: "adc", autor: "Andres" },
  { id: 2, titulo: "cgfs", autor: "Jose" },
  { id: 3, titulo: "sfdsd", autor: "Guamy" },
];

// 1️GET /libros -> Devuelve todos los libros o filtra por autor
app.get('/libros', (req, res) => {
  const { autor } = req.query;
  if (autor) {
    const filtrados = libros.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
    res.json(filtrados);
  } else {
    res.json(libros);
  }
});

// GET /libros/:id -> Devuelve un libro por ID
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ mensaje: "Libro no encontrado" });
  }
});

//  POST /libros -> Crea un nuevo libro con validación
app.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ mensaje: "El título y el autor son obligatorios" });
  }

  const nuevoLibro = {
    id: libros.length ? libros[libros.length - 1].id + 1 : 1,
    titulo,
    autor
  };

  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

// PUT /libros/:id -> Actualiza un libro por ID
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;

  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  if (!titulo || !autor) {
    return res.status(400).json({ mensaje: "El título y el autor son obligatorios para actualizar" });
  }

  libros[index] = { id, titulo, autor };
  res.json(libros[index]);
});

// DELETE /libros/:id -> Elimina un libro por ID
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  const eliminado = libros.splice(index, 1)[0];
  res.json({ mensaje: "Libro eliminado", libro: eliminado });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
