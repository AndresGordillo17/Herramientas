import { Hono } from 'hono';

const ping = new Hono();

ping.get('/ping', (c) => {
  return c.json({ message: 'pong' });
});

export default ping;