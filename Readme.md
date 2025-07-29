
# 📦 Sistema CRUD con Angular, Node.js y MongoDB

Este sistema permite gestionar empleados, servicios, productos y usuarios, con autenticación segura mediante JWT (JSON Web Tokens).

---

## 📁 Estructura del Proyecto

```
GESTION-EMPLEADOS/
├── BackEnd/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── database.js
│   └── index.js
├── FrontEnd/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── empleados/
│   │   │   │   ├── servicios/
│   │   │   │   ├── productos/
│   │   │   │   └── auth/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.module.ts
│   │   └── environments/
│   │       ├── environment.ts
│   │       └── environment.prod.ts
├── .env
├── package.json
└── README.md
```

---

## 🧪 Tecnologías utilizadas

**Backend**: Node.js, Express, MongoDB (Mongoose), JWT, dotenv, nodemon  
**Frontend**: Angular (v16+), Angular Material, TypeScript, RxJS, HttpClient

---

## 🔐 Autenticación JWT

Las rutas protegidas requieren un token en el encabezado `Authorization: Bearer <token>`

### Registro

```
POST /api/auth/register
```

```json
{
  "nombre": "admin01",
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Login

```
POST /api/auth/login
```

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Uso del token JWT

```
Authorization: Bearer TU_TOKEN
```

---

## 🖥 Backend: Instrucciones de uso

1. Abre terminal en `BackEnd/`
2. Ejecuta `npm install`
3. Crea archivo `.env`:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/gestion
SECRET_KEY=tu_clave_secreta
```

4. Inicia el servidor:

```
npm run dev
```

5. Abre `http://localhost:3000/api`

### CRUD Backend (usando Postman o cualquier cliente HTTP)

**Empleados**

```
GET /api/empleados
POST /api/empleados
PUT /api/empleados/:id
DELETE /api/empleados/:id
```

```json
{
  "name": "Luis Pérez",
  "position": "Desarrollador",
  "office": "Bogotá",
  "salary": 4000000
}
```

**Servicios**

```
GET /api/servicios
POST /api/servicios
PUT /api/servicios/:id
DELETE /api/servicios/:id
```

```json
{
  "nombre": "Mantenimiento",
  "descripcion": "Mantenimiento preventivo",
  "precio": 150000
}
```

**Productos**

```
GET /api/productos
POST /api/productos
PUT /api/productos/:id
DELETE /api/productos/:id
```

```json
{
  "nombre": "Impresora HP",
  "categoria": "Tecnología",
  "precio": 850000,
  "stock": 12
}
```

---

## 🌐 Frontend: Instrucciones de uso

1. Abre terminal en `FrontEnd/`
2. Ejecuta `npm install`
3. Verifica que en `src/environments/environment.ts` esté la URL correcta:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

4. Inicia el servidor Angular:

```
ng serve
```

5. Abre `http://localhost:4200` en el navegador

---

## 🧠 Funcionamiento del Frontend

Cada módulo (empleados, servicios, productos) tiene su propio componente y servicio HTTP:

- Los formularios usan `[(ngModel)]` para enlazar datos.
- Las peticiones usan `HttpClient`.
- Las tablas usan `mat-table`, `mat-paginator`, `mat-sort`.
- Angular Material da diseño responsivo y moderno.

Al guardar, editar o eliminar, la tabla se actualiza automáticamente.

---

## 🧪 Testing con Postman

1. Importa `API_Gestion_Empleados_FULL.postman_collection.json`
2. Regístrate e inicia sesión para obtener el token JWT
3. Agrega el token como header:
   - Key: `Authorization`
   - Value: `Bearer <tu_token>`

---

## 💻 Hecho con Node.js, Angular, MongoDB 💻
