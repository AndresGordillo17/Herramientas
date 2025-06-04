 Proyecto Básico con Hono

 Instalación del Proyecto

1. Crea una carpeta para el proyecto e inicializa con npm:

~~~
npm init -y
~~~

2. Instala Hono como dependencia:

~~~
npm install hono
~~~

3. Asegúrate de que tu `package.json` tenga el siguiente campo:

~~~
"type": "module"
~~~

4. Crea un archivo `index.js` con el siguiente contenido:

~~~js
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('¡Hola, mundo desde Hono!'))

app.get('/saludo/:nombre', (c) => {
  const nombre = c.req.param('nombre')
  return c.text(`Hola, ${nombre}!`)
})

app.listen(3000)
console.log('Servidor corriendo en http://localhost:3000')
~~~
 Ejecuta el siguiente comando en la raíz del proyecto:

~~~
node index.js
~~~
