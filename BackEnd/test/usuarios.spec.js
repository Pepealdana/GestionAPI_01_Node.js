const request = require("supertest");
const app = require("../index"); // Servidor principal
const mongoose = require("mongoose");

let usuarioId;

describe("CRUD Usuarios API", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Conectado a MongoDB para tests de usuarios");
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // CREATE
  it("Debería crear un nuevo usuario", async () => {
    const correoTest = `carlos${Date.now()}@test.com`;
    const res = await request(app)
      .post("/api/usuarios")
      .send({
        nombre: "Carlos Gómez",
        email: correoTest,
        telefono: "3001234567",
        rol: "admin",
        password: "123456", // <-- agregado para cumplir con el modelo
      });

    expect([200, 201]).toContain(res.statusCode);

    expect(res.body).toHaveProperty("status", "Usuario creado");
    expect(res.body).toHaveProperty("usuario");
    expect(res.body.usuario).toHaveProperty("_id");
    expect(res.body.usuario).toHaveProperty("nombre", "Carlos Gómez");

    // Guardamos el ID para usar en tests posteriores
    usuarioId = res.body.usuario._id;
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
    if (!usuarioId) throw new Error("usuarioId no está definido");

    const res = await request(app).get(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", usuarioId);
    expect(res.body).toHaveProperty("nombre", "Carlos Gómez");
  });

  // UPDATE
  it("Debería actualizar un usuario existente", async () => {
    if (!usuarioId) throw new Error("usuarioId no está definido");

    const correoActualizado = `carlos${Date.now()}@test.com`;
    const res = await request(app)
      .put(`/api/usuarios/${usuarioId}`)
      .send({
        nombre: "Carlos G. Actualizado",
        email: correoActualizado,
        telefono: "3107654321",
        rol: "editor",
        password: "654321", // <-- agregado para cumplir con el modelo
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "Usuario actualizado");
    expect(res.body).toHaveProperty("usuario");
    expect(res.body.usuario).toHaveProperty("nombre", "Carlos G. Actualizado");
    expect(res.body.usuario).toHaveProperty("email", correoActualizado);
  });

  // DELETE
  it("Debería eliminar un usuario", async () => {
    if (!usuarioId) throw new Error("usuarioId no está definido");

    const res = await request(app).delete(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "Usuario eliminado");
    expect(res.body).toHaveProperty("usuario");
    expect(res.body.usuario).toHaveProperty("_id", usuarioId);
  });
});
