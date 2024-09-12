# Proyecto de gestión de reservas con arquitectura hexagonal

## Descripción

Este proyecto es una API de gestión de reservas construida con Node.js, MongoDB y Express, siguiendo la arquitectura hexagonal para mantener una separación clara entre las diferentes capas de la aplicación. La API permite crear, leer, actualizar y eliminar usuarios, y realiza validaciones como el formato de correo electrónico.

## Tecnologías y Versiones

- **Node.js**: v20.5.0
- **MongoDB**: v5.0.28
- **Paquetes de Node.js**:
 - `bcryptjs`: ^2.4.3
 - `body-parser`: ^1.20.3
 - `dotenv`: ^16.4.5
 - `express`: ^4.21.0
 - `jsonwebtoken`: ^9.0.2
 - `mongoose`: ^8.6.2
 - `nodemon`: ^3.1.4

## Arquitectura

El proyecto está basado en **arquitectura hexagonal** (también conocida como arquitectura de puertos y adaptadores). Esta arquitectura ayuda a mantener el código bien organizado y separa la lógica de negocio de las dependencias externas como bases de datos o servicios web.

## Instalación

1. **Clona el repositorio:**

  `git clone https://github.com/freiman-uribe/backen_reservas.git`

2. **Instalar las dependencias:**
 - Asegúrate de tener Node.js y npm instalados en la versión v20.5.0 y mongoDB v5.0.28. Luego, ejecuta:

  `npm install`

3. **Configurar Variables de Entorno:**
 - Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables (en el repositorio encontrarás un ejemplo .env.example):

   `PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
   JWT_SECRET=tu_secreto_jwt`
 
4. **Iniciar el Servidor:**
 - Para iniciar el servidor, usa el siguiente comando:

   `npm run start`

 - Durante el desarrollo, puedes usar **nodemon** para reiniciar automáticamente el servidor cuando se detecten cambios en los archivos:

   `npm run dev`

## Uso

- ### Rutas y Endpoints:

   - #### Auth
       - **POST** `/auth/register`: Manipulación de usuarios
       - **POST**`/auth/login`: Manipulación de usuarios

   - #### Servicios
       - **GET**`/service/`: Lista de servicios.
       - **GET**`/service/:id`: Servicio por id.
       - **POST**`/service/`: Creación de servicio.
       - **PUT**`/service/:id`: Actualización de servicio.
       - **DELETE**`/service/:id`: Eliminación de servicio.

   - #### Reservas
       - **GET**`/reservation/`: Lista de reservas
       - **GET**`/reservation/:id`: Reserva por id.
       - **POST**`/reservation/`: Creación de reserva.
       - **PUT**`/reservation/:id`: Actualización de servicio.
       - **DELETE**`/reservation/:id`: Cancelación de reserva.

