const request = require("supertest");
const app = require("../index"); // servidor principal
const mongoose = require("mongoose");

let empleadoId; // Guardaremos el ID del empleado creado

describe("CRUD Empleados API", () => {
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
  it("Debería crear un nuevo empleado", async () => {
    const res = await request(app)
      .post("/api/empleados")
      .send({
        name: "Juan Pérez",
        position: "Desarrollador",
        office: "Bogotá",
        salary: 3500000,
      });

    expect(res.statusCode).toEqual(201); // ahora es 201
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "Juan Pérez");

    empleadoId = res.body._id; // Guardamos el ID para siguientes pruebas
  });

  // READ (Todos)
  it("Debería obtener todos los empleados", async () => {
    const res = await request(app).get("/api/empleados");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
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
    expect(res.body).toHaveProperty("office", "Medellín");
  });

  // DELETE
  it("Debería eliminar un empleado", async () => {
    const res = await request(app).delete(`/api/empleados/${empleadoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "Empleado eliminado");
    expect(res.body).toHaveProperty("empleado");
    expect(res.body.empleado).toHaveProperty("_id", empleadoId);
  });
});
