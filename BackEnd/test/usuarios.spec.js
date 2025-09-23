const request = require("supertest");
const app = require("../index"); // servidor principal
const mongoose = require("mongoose");

let usuarioId;

describe("CRUD Usuarios API", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // CREATE
  it("Debería crear un nuevo usuario", async () => {
    const res = await request(app)
      .post("/api/usuarios")
      .send({
        nombre: "Carlos Gómez",
        email: `carlos${Date.now()}@test.com`, // correo dinámico para evitar duplicados
        telefono: "3001234567",
        rol: "admin",
      });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("status", "Usuario creado");

    // Obtenemos el ID real del usuario recién creado
    const usuarios = await request(app).get("/api/usuarios");
    usuarioId = usuarios.body[usuarios.body.length - 1]._id;
  });

  // READ (Todos)
  it("Debería obtener todos los usuarios", async () => {
    const res = await request(app).get("/api/usuarios");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // READ (Uno por ID)
  it("Debería obtener un usuario por ID", async () => {
    const res = await request(app).get(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", usuarioId);
    expect(res.body).toHaveProperty("nombre", "Carlos Gómez");
  });

  // UPDATE
  it("Debería actualizar un usuario existente", async () => {
    const res = await request(app)
      .put(`/api/usuarios/${usuarioId}`)
      .send({
        nombre: "Carlos G. Actualizado",
        email: `carlos${Date.now()}@test.com`, // correo nuevo para que pase validación
        telefono: "3107654321",
        rol: "editor",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "Usuario actualizado");
  });

  // DELETE
  it("Debería eliminar un usuario", async () => {
    const res = await request(app).delete(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "Usuario eliminado");
  });
});
