# Sistema CRUD con Angular, Node.js y MongoDB

Sistema CRUD para gestionar empleados, servicios, productos y usuarios, con autenticación mediante JWT.

## Tecnologías

- **Backend:** Node.js, Express, MongoDB/Mongoose, JWT, dotenv, Jest, Supertest
- **Frontend:** Angular, Angular Material, TypeScript, RxJS, HttpClient

## Estructura

```text
GESTION-EMPLEADOS/
├── BackEnd/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── database.js
│   └── index.js
├── frontend/
├── .env.example
├── package.json
└── README.md
```

## Configuración segura

Las variables de entorno **no se almacenan en Git**.

1. Copia `.env.example` como `.env`.
2. Define valores locales para las variables.
3. Genera un secreto JWT largo y aleatorio para cada entorno.
4. Nunca publiques el archivo `.env` ni credenciales reales.

Ejemplo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/empleados
JWT_SECRET=replace_with_a_long_random_secret
```

> El secreto JWT que haya sido publicado anteriormente debe considerarse comprometido y no debe reutilizarse.

## Backend

Desde la raíz del proyecto:

```bash
npm install
npm start
```

Para desarrollo:

```bash
npm run dev
```

Pruebas:

```bash
npm test
```

El backend utiliza `MONGO_URI` para la conexión a MongoDB.

## Autenticación JWT

Las rutas protegidas utilizan:

```http
Authorization: Bearer <token>
```

### Registro

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

## CRUD

### Empleados

```text
GET    /api/empleados
POST   /api/empleados
PUT    /api/empleados/:id
DELETE /api/empleados/:id
```

### Servicios

```text
GET    /api/servicios
POST   /api/servicios
PUT    /api/servicios/:id
DELETE /api/servicios/:id
```

### Productos

```text
GET    /api/productos
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
```

## Buenas prácticas del repositorio

- Los secretos y variables locales se mantienen fuera del control de versiones.
- `node_modules/` no forma parte del repositorio.
- La cobertura generada por Jest se mantiene fuera del repositorio.
- Las credenciales de desarrollo deben ser diferentes de cualquier credencial utilizada en producción.
- Las dependencias se instalan mediante `npm install` a partir de `package.json` y `package-lock.json`.

## Estado

Proyecto educativo para practicar desarrollo full-stack con Angular, Node.js, Express, MongoDB y autenticación JWT.
