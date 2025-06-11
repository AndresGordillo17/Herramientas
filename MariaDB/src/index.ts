import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import ping from './ping/ping.js'; 
import greet from './greet/greet.js';

const server = new Hono();

server.get('/', (c) => c.text('Hello Hono!'));

server.route('/', ping);
server.route('/', greet);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: server.fetch,
  port
});