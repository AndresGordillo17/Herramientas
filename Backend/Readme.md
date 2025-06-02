nmp = gestor paquetes node.js
nmp init = crea un nuevo proyecto (package.json)
crear index.js


Proyecto Node.js + Docker en AWS

1. - sudo apt update
- Actualiza la lista de paquetes disponibles desde los repositorios configurados. 2.- sudo apt install apt-transport-https ca-certificates curl software-properties-common Instala herramientas necesarias:
- apt-transport-https: Permite usar HTTPS en los repositorios de APT.

- ca-certificates: Asegura que tu sistema pueda verificar certificados SSL (seguridad).

- curl: Utilidad para descargar archivos desde la web por terminal.

- software-properties-common: Permite manejar fácilmente los repositorios (add-apt-repository).

3\.-curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

- Descarga la clave GPG pública del repositorio oficial de Docker.
- apt-key add - registra esa clave para que Ubuntu confíe en los paquetes del repositorio de Docker (por seguridad).

4\.-sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

- Añade el repositorio oficial de Docker a tu lista de fuentes APT.

- "focal" es el nombre de código para Ubuntu 20.04.

- [arch=amd64] especifica que el repositorio es para sistemas de 64 bits.

5\.- apt-cache policy docker-ce

- Verifica que Docker esté disponible para instalar y muestra la versión más reciente que puede instalarse.

6\.-sudo apt install docker-ce

- Instala Docker Community Edition (CE), que es la versión gratuita y de código abierto de Docker.

7\.-sudo systemctl status docker

- Muestra el estado del servicio Docker: si está activo, inactivo, con errores, etc.

8\.-Código Archivo Docker FROM node:20.1-alpine3.18

- Usa una imagen base de Node.js versión 20.1 sobre Alpine Linux 3.18, una distribución pequeña y rápida.
- Ideal para producción por su bajo tamaño (~5MB base).

WORKDIR /app

- Crea (si no existe) y se posiciona en el directorio /app dentro del contenedor. • Todas las acciones siguientes se harán desde allí.

COPY package.json .

- Copia solo el archivo package.json desde tu máquina al directorio de trabajo (/app) dentro del contenedor.
- Se hace esto antes de copiar todo para aprovechar el cache de capas de Docker (evita reinstalar dependencias cada vez).

RUN npm install

- Ejecuta npm install para instalar todas las dependencias definidas en package.json.

COPY index.js .

- Copia el archivo de tu aplicación (index.js) al contenedor, dentro de /app.

EXPOSE 8080

- Informa que el contenedor escucha en el puerto 8080.
- No abre el puerto automáticamente, solo es una "documentación interna" para Docker y herramientas como docker run -p.

CMD ["node", "index.js"]

- Este es el comando por defecto que se ejecutará cuando el contenedor inicie.

Sincronización con Git 1.-git status

- Muestra los archivos modificados, nuevos, o eliminados que no han sido registrados aún en el repositorio.

2\.-git add .

- Añade todos los archivos nuevos/modificados al staging area (preparados para commit).

3\.-git commit -m "Nombre…."

- Crea un nuevo commit (versión guardada del proyecto) con un mensaje que describe el cambio.

4\.-git push

- Envía tu commit al repositorio remoto en GitHub.

Comandos Docker para construir y ejecutar el contenedor

1. -sudo docker build -t node-hello .
- Construye una imagen Docker con nombre (-t) node-hello.

- Usa el Dockerfile ubicado en el directorio actual (.).

2\.-sudo docker run -d -p 8080:8080 --name hello --restart on-failure node-hello:latest Significado de cada parte:

- -d: Ejecuta el contenedor en segundo plano (detached).
- -p 8080:8080: Expone el puerto 8080 del contenedor al puerto 8080 de tu máquina.
- --name hello: Asigna un nombre personalizado al contenedor (hello).
- --restart on-failure: Si el contenedor falla (crashea), se reiniciará automáticamente.
- node-hello:latest: Especifica que se ejecute la imagen node-hello en su versión más reciente (latest).

