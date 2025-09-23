const request = require("supertest");
const app = require("../index"); // servidor principal
const mongoose = require("mongoose");

let servicioId;

describe("CRUD Servicios API", () => {
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
  it("Debería crear un nuevo servicio", async () => {
    const res = await request(app)
      .post("/api/servicios")
      .send({
        nombre: "Hosting",
        descripcion: "Servicio de hosting web",
        precio: 120,
        disponible: true,
      });

    expect(res.statusCode).toEqual(201); // fijo en 201
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("nombre", "Hosting");

    servicioId = res.body._id;
  });

  // READ (Todos)
  it("Debería obtener todos los servicios", async () => {
    const res = await request(app).get("/api/servicios");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // READ (Uno por ID)
  it("Debería obtener un servicio por ID", async () => {
    const res = await request(app).get(`/api/servicios/${servicioId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre", "Hosting");
  });

  // UPDATE
  it("Debería actualizar un servicio existente", async () => {
    const res = await request(app)
      .put(`/api/servicios/${servicioId}`)
      .send({
        nombre: "Hosting Premium",
        descripcion: "Servicio de hosting actualizado",
        precio: 200,
        disponible: false,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre", "Hosting Premium");
    expect(res.body).toHaveProperty("disponible", false);
  });

  // DELETE
  it("Debería eliminar un servicio", async () => {
    const res = await request(app).delete(`/api/servicios/${servicioId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "Servicio eliminado");
    expect(res.body).toHaveProperty("servicio");
    expect(res.body.servicio).toHaveProperty("_id", servicioId);
  });
});
