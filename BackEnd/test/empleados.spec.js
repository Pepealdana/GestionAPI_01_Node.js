const request = require("supertest");
const app = require("../index"); // tu servidor principal
const mongoose = require("mongoose");

// Datos de prueba
let empleadoId;

describe("CRUD Empleados API", () => {
  beforeAll(async () => {
    // Aseguramos la conexión a Mongo
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
  it("Debería crear un nuevo empleado", async () => {
    const res = await request(app)
      .post("/api/empleados")
      .send({
        name: "Juan Pérez",
        position: "Desarrollador",
        office: "Bogotá",
        salary: 3500000,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    empleadoId = res.body._id;
  });

  // READ (Todos)
  it("Debería obtener todos los empleados", async () => {
    const res = await request(app).get("/api/empleados");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // READ (Uno por ID)
  it("Debería obtener un empleado por ID", async () => {
    const res = await request(app).get(`/api/empleados/${empleadoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Juan Pérez");
  });

  // UPDATE
  it("Debería actualizar un empleado existente", async () => {
    const res = await request(app)
      .put(`/api/empleados/${empleadoId}`)
      .send({
        name: "Juan Pérez",
        position: "Senior Dev",
        office: "Medellín",
        salary: 5000000,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("position", "Senior Dev");
  });

  // DELETE
  it("Debería eliminar un empleado", async () => {
    const res = await request(app).delete(`/api/empleados/${empleadoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
