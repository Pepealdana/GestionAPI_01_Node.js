# Proyecto API REST - Gestión de Empleados, Servicios, Productos y Autenticación

Este proyecto consiste en una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB**, que permite gestionar empleados, servicios, productos y usuarios, así como realizar autenticación segura con JWT (JSON Web Tokens). Los usuarios pueden registrarse e iniciar sesión mediante rutas específicas (/api/auth/register y /api/auth/login). Al autenticarse, reciben un **token JWT** que deben enviar en el encabezado Authorization en cada solicitud a rutas protegidas. El backend valida este token para permitir el acceso solo a usuarios autorizados.

Una API RESTful es una interfaz que sigue los principios de REST (Representational State Transfer). Se caracteriza por:

📍 Utilizar HTTP: opera con métodos como **GET**, **POST**, **PUT**, **DELETE** para manipular recursos.
🧩 Recursos identificados por URLs: por ejemplo, /api/empleados representa la colección de empleados.
📦 Datos en formato JSON o XML: en este proyecto se usa JSON.
🔁 Sin estado (stateless): cada petición al servidor debe contener toda la información necesaria para procesarla.
🔄 Operaciones CRUD claras: permite crear, leer, actualizar y eliminar datos.

## 📁 Estructura del Proyecto

```
GESTION-EMPLEADOS
├──BackEnd/
│    ├── controllers/         # Lógica para cada módulo
│    │   ├── empleado.controller.js
│    │   ├── servicio.controller.js
│    │   ├── producto.controller.js
│    │   ├── usuario.controller.js
│    │   └── auth.controller.js
│    ├── middlewares/         # Esquemas de validación
│    │   ├── isAdmin.js
│    │   └── verifyToken.js
│    ├── models/              # Esquemas de modelos
│    │   ├── empleado.js
│    │   ├── servicio.js
│    │   ├── producto.js
│    │   └── usuario.js
│    ├── postman/             # Herramienta de pruebas
│    │   └──  gestion_empleados_collection.json
│    ├── routes/              # Rutas de cada módulo
│    │   ├── empleado.routes.js
│    │   ├── servicio.routes.js
│    │   ├── producto.routes.js
│    │   ├── usuario.routes.js
│    │   └── auth.routes.js
│    ├── database.js          # Conexión a MongoDB
│    ├── empleado.js          
│    └── index.js             # Archivo principal del  servidor
├── .env                      # Variables de entorno (puerto y URI de MongoDB)
├── packkage.json             # Define el proyecto, scripts y dependencias generales
└── package-lock.json         # Versiones del proyecto
```

## 🚀 Tecnologías Utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* Postman (para testing)
* dotenv (configuración)
* nodemon (modo desarrollo)

## 🔐 Autenticación con JWT

## 🔐 Autenticación (`/api/auth`)

### Registro (`POST /api/auth/register`)
Crea un nuevo usuario con contraseña segura y devuelve un token JWT.

```json
{
  "nombre": "admin01",
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Login (`POST /api/auth/login`)
Devuelve un token si el correo y contraseña coinciden.

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### 🪪 Usar el token JWT
Copia el token recibido y úsalo en las rutas protegidas como esta:

```
Authorization: Bearer TU_TOKEN
```

En Postman:
- Ve a la pestaña **Headers**
- Agrega:  
  - Key: `Authorization`  
  - Value: `Bearer eyJhbGciOi...` (tu token)

---

## 👤 Usuarios (`/api/usuarios`)

- `POST` – Crea un nuevo usuario (por ejemplo, desde un panel admin)
- `GET` – Lista todos los usuarios (requiere token)
- `GET /:id` – Trae los datos de un usuario específico
- `PUT /:id` – Modifica datos de un usuario existente (admin)
- `DELETE /:id` – Elimina a un usuario (admin)
- `PATCH /cambiar-rol/:id` – Cambia el rol de usuario a `admin` o `usuario`
- `GET /perfil` – Devuelve la información del usuario autenticado (requiere token)

🛠️ **Ejemplo para crear usuario**:
```json
{
  "nombre": "Camila",
  "email": "camila@example.com",
  "telefono": "3121234567",
  "rol": "usuario",
  "password": "123456"
}
```

---

## 👨‍💼 Empleados (`/api/empleados`)

Permite CRUD completo (Crear, Leer, Actualizar, Eliminar) de empleados.

🛠️ **Ejemplo POST**:
```json
{
  "name": "Luis Pérez",
  "position": "Desarrollador",
  "office": "Bogotá",
  "salary": 4000000
}
```

---

## 🧰 Servicios (`/api/servicios`)

Gestiona los servicios que ofrece la empresa.

🛠️ **Ejemplo POST**:
```json
{
  "nombre": "Mantenimiento",
  "descripcion": "Mantenimiento preventivo",
  "precio": 150000
}
```

---

## 📦 Productos (`/api/productos`)

Administra los productos del inventario.

🛠️ **Ejemplo POST**:
```json
{
  "nombre": "Impresora HP",
  "categoria": "Tecnología",
  "precio": 850000,
  "stock": 12
}
```

---

## ▶️ Iniciar el Servidor

```bash
npm install
npm run dev
```

---

## 🧪 Testing con Postman

1. Ejecuta el servidor:  
   ```bash
   npm run dev
   ```

2. Abre **Postman**

3. Ve a `Importar → Archivo` y selecciona:  
   📦 `API_Gestion_Empleados_FULL.postman_collection.json`

4. Usa los endpoints incluidos para:
   - Registrar usuarios
   - Hacer login
   - Obtener el token
   - Usar el token en rutas protegidas
   - Probar POST, GET, PUT y DELETE para cada módulo

---

## 📁 Archivos útiles

- `.env` → configuración de claves y URI de MongoDB
- `API_Gestion_Empleados_FULL.postman_collection.json` → colección completa para Postman

---

## 📌 Notas

* MongoDB debe estar corriendo localmente (por ejemplo, en `mongodb://localhost:27017/empleados`)
* Las colecciones se crean automáticamente cuando se insertan datos por primera vez

---

✅ Conectado a MongoDB

🌐 Frontend - Interfaz Angular (/FrontEnd)
El frontend de este proyecto está desarrollado con Angular y usa Angular Material para la interfaz de usuario. Permite a los usuarios gestionar empleados, servicios y productos desde una única aplicación visualmente organizada en tarjetas, formularios y tablas.

📦 Funcionalidades disponibles
Formulario para crear/editar empleados, servicios y productos.

Visualización en tablas tipo Angular Material con filtros, paginación y ordenamiento.

Interacción directa con la API RESTful (conexión con el backend).

Operaciones CRUD completas desde la interfaz.

Diseño responsivo con layout adaptable.

Panel de autenticación en desarrollo.

▶️ Cómo iniciar el servidor Angular
Asegúrate de tener Angular CLI instalado:

bash
Copiar
Editar
npm install -g @angular/cli
Desde la carpeta /FrontEnd, instala las dependencias:

bash
Copiar
Editar
npm install
Ejecuta el servidor de desarrollo:

bash
Copiar
Editar
ng serve
Accede en tu navegador:

arduino
Copiar
Editar
http://localhost:4200
🔁 Conexión con el Backend
El frontend se conecta con el backend a través de servicios HTTP en Angular. Estos servicios están definidos en archivos como:

empleado.service.ts

servicio.service.ts

producto.service.ts

Cada uno hace solicitudes a la API correspondiente (/api/empleados, /api/servicios, /api/productos) usando HttpClient.

💡 Importante: Asegúrate de que el backend esté corriendo en http://localhost:3000 o el puerto definido en .env, y que el archivo environment.ts tenga la URL correcta para la API:

ts
Copiar
Editar
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api' // <-- Reemplaza si cambias el puerto
};
📋 Estructura Angular simplificada
graphql
Copiar
Editar
FrontEnd/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── empleados/      # Componentes y vista empleados
│   │   │   ├── servicios/      # Componentes y vista servicios
│   │   │   ├── productos/      # Componentes y vista productos
│   │   │   └── auth/           # (En construcción) Login y registro
│   │   ├── services/           # Servicios HTTP que conectan al backend
│   │   ├── models/             # Interfaces: Empleado, Servicio, Producto
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── environments/
│   │   ├── environment.ts      # URL base del backend
│   │   └── environment.prod.ts