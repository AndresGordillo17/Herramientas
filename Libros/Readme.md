 Comandos básicos
- npm – gestor de paquetes de Node.js  
- npm init – crea un nuevo proyecto de Node (genera package.json)  
- Crear index.js – archivo principal de la aplicación  
- node index.js – ejecuta el proyecto de Node  
- npm i express – instala el framework Express
- 
  \# API RESTful de Libros con Node.js y Express

\## Descripción

Este proyecto es un servicio web RESTful para manejar una colección de libros. Permite crear, leer, actualizar, eliminar y filtrar libros por autor.

\---

\## Endpoints

\### 1. GET /libros

- Devuelve todos los libros.
- Permite filtrar por autor con query parameter: `?autor=nombre`.

\*\*Ejemplo request:\*\*

GET http://localhost:8080/libros

GET http://localhost:8080/libros?autor=Andres

\*\*Ejemplo response:\*\*

\```json

[

{ "id": 1, "titulo": "adc", "autor": "Andres" },

{ "id": 2, "titulo": "cgfs", "autor": "Jose" }

]

2\. GET /libros/:id

Devuelve un libro específico por ID.

Si el libro no existe, devuelve código 404.

GET http://localhost:8080/libros/2

ejemplo :

{ "id": 2, "titulo": "cgfs", "autor": "Jose" }

3\. POST /libros

Crea un nuevo libro.

El body JSON debe incluir "titulo" y "autor".

Si faltan, devuelve 400.

Ejemplo request:

POST http://localhost:8080/libros

Content-Type: application/json

{

"titulo": "Nuevo Libro",

"autor": "Nuevo Autor"

}

4\. PUT /libros/:id

Actualiza un libro existente por ID.

El body debe incluir "titulo" y "autor".

Si el libro no existe, devuelve 404.

Si faltan campos, devuelve 400.

Ejemplo request:

PUT http://localhost:8080/libros/2

Content-Type: application/json

{

"titulo": "Libro Modificado",

"autor": "Autor Modificado"

}

5\. DELETE /libros/:id

Elimina un libro por ID.

Si el libro no existe, devuelve 404.

Ejemplo request:

DELETE http://localhost:8080/libros/3

Comandos Docker usados

Actualizar paquetes:

sudo apt update

Instalar herramientas necesarias:

sudo apt install apt-transport-https ca-certificates curl software-properties-common

Añadir clave GPG de Docker:

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

Añadir repositorio oficial Docker:

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

Verificar disponibilidad Docker:

apt-cache policy docker-ce

Instalar Docker:


sudo apt install docker-ce

Verificar estado Docker:

sudo systemctl status Docker

Dockerfile para la aplicación

FROM node:20.1-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY index.js .

EXPOSE 8080

CMD ["node", "index.js"]

Construir y ejecutar la imagen Docker

Construir la imagen:

sudo docker build -t node-hello .

Ejecutar el contenedor:

sudo docker run -d -p 8080:8080 --name hello --restart on-failure node-hello:latest

Sincronización con Git

git status

git add .

git commit -m "crud libros "

git push

