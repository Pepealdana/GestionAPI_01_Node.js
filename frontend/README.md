
# 📦 Sistema de Gestión CRUD con Angular, Node.js y MongoDB

Este proyecto permite gestionar **Empleados**, **Servicios** y **Productos** mediante una interfaz moderna en Angular y una API RESTful construida con Node.js y MongoDB. Incorpora autenticación segura mediante JWT.

---

## 🔍 Descripción General

Combina:
- **Frontend**: Angular + Angular Material
- **Backend**: Node.js + Express + MongoDB

Permite:
- Operaciones CRUD completas en empleados, productos y servicios
- Registro e inicio de sesión de usuarios
- Protección de rutas con token JWT
- Interfaz responsiva con Angular Material

---

## 🗂 Estructura del Proyecto

GESTION-EMPLEADOS/
├── BackEnd/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── database.js
│ └── index.js
├── FrontEnd/
│ ├── src/
│ │ ├── app/
│ │ │ ├── components/
│ │ │ │ ├── empleados/
│ │ │ │ ├── servicios/
│ │ │ │ ├── productos/
│ │ │ │ └── auth/
│ │ │ ├── services/
│ │ │ ├── models/
│ │ │ ├── app-routing.module.ts
│ │ │ └── app.module.ts
│ │ └── environments/
│ │ ├── environment.ts
│ │ └── environment.prod.ts
├── .env
├── package.json
└── README.md


---

## 🚀 Iniciar el Proyecto en Local

### 🖥 Backend

1. Abre terminal en la carpeta `BackEnd/`
2. Instala dependencias:
   ```bash
   npm install
Crea un archivo .env con el siguiente contenido:



PORT=3000
MONGODB_URI=mongodb://localhost:27017/gestion
SECRET_KEY=tu_clave_secreta
Ejecuta el servidor:



npm run dev
Accede a la API en:
👉 http://localhost:3000/api

🌐 Frontend
Abre una segunda terminal en FrontEnd/

Instala dependencias:



npm install
Configura el entorno en src/environments/environment.ts:

ts
Copiar
Editar
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
Ejecuta Angular:



ng serve
Abre tu navegador en:
👉 http://localhost:4200

✅ Operaciones CRUD - Backend
✍️ Empleados (/api/empleados)


POST /api/empleados
Content-Type: application/json

{
  "name": "Luis Pérez",
  "position": "Desarrollador",
  "office": "Bogotá",
  "salary": 4000000
}


GET /api/empleados


PUT /api/empleados/:id
Content-Type: application/json

{
  "name": "Luis Pérez",
  "position": "Senior Dev",
  "office": "Medellín",
  "salary": 5000000
}


DELETE /api/empleados/:id
⚙️ Servicios (/api/servicios)


POST /api/servicios
{
  "nombre": "Mantenimiento",
  "descripcion": "Mantenimiento preventivo",
  "precio": 150000
}


GET /api/servicios```

```http
PUT /api/servicios/:id
{
  "nombre": "Reparación",
  "precio": 200000
}


DELETE /api/servicios/:id
🛒 Productos (/api/productos)


POST /api/productos
{
  "nombre": "Impresora HP",
  "categoria": "Tecnología",
  "precio": 850000,
  "stock": 12
}


GET /api/productos


PUT /api/productos/:id
{
  "stock": 8
}



DELETE /api/productos/:id
🔐 Autenticación JWT
Registro (POST /api/auth/register)


{
  "nombre": "admin01",
  "email": "admin@example.com",
  "password": "admin123"
}
Login (POST /api/auth/login)
json
Copiar
Editar
{
  "email": "admin@example.com",
  "password": "admin123"
}
Enviar token en rutas protegidas
Header:


Authorization: Bearer TU_TOKEN
✅ Operaciones CRUD - Frontend Angular
Formulario dinámico para guardar y actualizar

Tabla con Angular Material (mat-table, mat-sort, mat-paginator)

Botones de acción para editar y eliminar

🎨 Angular Material
Se migró desde Materialize a Angular Material para:

Mejor integración con Angular

Uso de componentes como:

mat-card

mat-form-field

mat-input

mat-table

mat-paginator

mat-icon

Ventajas:

Diseño responsivo

Interacción fluida y accesible

Actualización automática de tabla tras guardar o editar

🧪 Pruebas con Postman
Inicia el backend:


npm run dev
Abre Postman e importa el archivo:


API_Gestion_Empleados_FULL.postman_collection.json
Usa las rutas de ejemplo para probar CRUD y autenticación.

📁 Archivos Clave
.env: configuración del puerto, clave y URI MongoDB

environment.ts: URL del backend para Angular

API_Gestion_Empleados_FULL.postman_collection.json: colección completa de pruebas