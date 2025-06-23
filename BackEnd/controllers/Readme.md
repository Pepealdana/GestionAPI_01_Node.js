# Proyecto API REST - Gestión de Empleados, Servicios, Productos y Autenticación

Este proyecto consiste en una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB**, que permite gestionar empleados, servicios, productos y usuarios, así como realizar autenticación básica.

## 📁 Estructura del Proyecto

```
BackEnd/
├── controllers/         # Lógica para cada módulo
│   ├── empleado.controller.js
│   ├── servicio.controller.js
│   ├── producto.controller.js
│   ├── usuario.controller.js
│   └── auth.controller.js
├── models/              # Esquemas de Mongoose
│   ├── empleado.js
│   ├── servicio.js
│   ├── producto.js
│   └── usuario.js
├── routes/              # Rutas de cada módulo
│   ├── empleado.routes.js
│   ├── servicio.routes.js
│   ├── producto.routes.js
│   ├── usuario.routes.js
│   └── auth.routes.js
├── database.js          # Conexión a MongoDB
├── index.js             # Archivo principal del servidor
└── .env                 # Variables de entorno (puerto y URI de MongoDB)
```

## 🚀 Tecnologías Utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* Postman (para testing)
* dotenv (configuración)
* nodemon (modo desarrollo)

## 🔐 Autenticación (Módulo `auth`)

### 1. Registrar Usuario

**Ruta:** `POST /api/auth/register`

**JSON requerido:**

```json
{
  "nombre": "Pedro",
  "email": "pedro@example.com",
  "password": "123456"
}
```

* Valida campos vacíos
* Valida formato de email
* Verifica si el correo ya está registrado

### 2. Iniciar Sesión

**Ruta:** `POST /api/auth/login`

**JSON requerido:**

```json
{
  "email": "pedro@example.com",
  "password": "123456"
}
```

* Valida existencia del usuario
* Verifica que la contraseña sea correcta

## 👤 Usuarios (Módulo `usuarios`)

**Campos:** `nombre`, `email`, `telefono`, `rol`

* `POST /api/usuarios` → Crear usuario (con validaciones)
* `GET /api/usuarios` → Obtener todos los usuarios
* `GET /api/usuarios/:id` → Obtener usuario por ID
* `PUT /api/usuarios/:id` → Actualizar usuario (valida email repetido)
* `DELETE /api/usuarios/:id` → Eliminar usuario

## 👨‍💼 Empleados (Módulo `empleados`)

**Campos:** `name`, `position`, `office`, `salary`

* `POST /api/empleados` → Crear empleado
* `GET /api/empleados` → Obtener todos
* `GET /api/empleados/:id` → Obtener uno por ID
* `PUT /api/empleados/:id` → Actualizar
* `DELETE /api/empleados/:id` → Eliminar

## 🧰 Servicios (Módulo `servicios`)

**Campos:** `nombre`, `descripcion`, `precio`

* `POST /api/servicios`
* `GET /api/servicios`
* `GET /api/servicios/:id`
* `PUT /api/servicios/:id`
* `DELETE /api/servicios/:id`

## 📦 Productos (Módulo `productos`)

**Campos:** `nombre`, `categoria`, `precio`, `stock`

* `POST /api/productos`
* `GET /api/productos`
* `GET /api/productos/:id`
* `PUT /api/productos/:id`
* `DELETE /api/productos/:id`

## ▶️ Iniciar el Servidor

```bash
npm install
npm run dev
```

## 🧪 Testing con Postman

1. Ejecutar el servidor (`npm run dev`)
2. Enviar peticiones a las rutas descritas arriba
3. Ver respuestas, validar errores, insertar o editar registros

## 📌 Notas

* No se ha implementado aún cifrado de contraseñas ni JWT (para próximos pasos)
* MongoDB debe estar corriendo localmente (por ejemplo, en `mongodb://localhost:27017/empleados`)
* Las colecciones se crean automáticamente cuando se insertan datos por primera vez

---

Cualquier error, revisa los logs en consola y asegúrate de que Mongo esté bien conectado ✅
