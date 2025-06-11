// Clase greet. Escucha peticiones HTTP 
// archivo greet.ts
import { Hono } from 'hono'
import { Greet, StatsResult } from './greet.mariadb.js'
import type { Param } from './greet.mariadb.js'

const greet = new Hono()

// GET  Obtener todos los saludos
greet.get('/regards', async (c) => c.json(await Greet.findAll()))

// Devuelve el total de registros y conteo por idioma
greet.get('/greet/stats', async (c) => {
  const stats: StatsResult = await Greet.stats()
  return c.json(stats)
})

// GET  Obtener un saludo por ID
greet.get('/greet/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const item = await Greet.findById(id)
  return item ? c.json(item) : c.json({ error: 'Not found' }, 404)
})

// POST  Crear un nuevo saludo
greet.post('/greet', async (c) => {
  const param = (await c.req.json()) as Param
  const result = await Greet.create(param)
  return c.json(result, 201)
})

// PUT  Actualizar un saludo existente
greet.put('/greet/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const param = (await c.req.json()) as Param
  const updated = await Greet.update(id, param)
  return updated ? c.json(updated) : c.json({ error: 'Not found' }, 404)
})

// DELETE  Eliminar un saludo
greet.delete('/greet/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const deleted = await Greet.remove(id)
  if (deleted) {
    return new Response('Deleted', { status: 204 })
  }
  return c.json({ error: 'Not found' }, 404)
})

export default greet