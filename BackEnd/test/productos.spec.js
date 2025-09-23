const request = require("supertest");
const app = require("../index"); // servidor principal
const mongoose = require("mongoose");

let productoId;

describe("CRUD Productos API", () => {
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
  it("Debería crear un nuevo producto", async () => {
    const res = await request(app)
      .post("/api/productos")
      .send({
        nombre: "Laptop",
        descripcion: "Laptop de pruebas",
        precio: 2500,
        stock: 10,
      });

    expect(res.statusCode).toEqual(201); // ahora fijo en 201
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("nombre", "Laptop");

    productoId = res.body._id; // guardamos el id real
  });

  // READ (Todos)
  it("Debería obtener todos los productos", async () => {
    const res = await request(app).get("/api/productos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // READ (Uno por ID)
  it("Debería obtener un producto por ID", async () => {
    const res = await request(app).get(`/api/productos/${productoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre", "Laptop");
  });

  // UPDATE
  it("Debería actualizar un producto existente", async () => {
    const res = await request(app)
      .put(`/api/productos/${productoId}`)
      .send({
        nombre: "Laptop Pro",
        descripcion: "Laptop actualizada",
        precio: 3000,
        stock: 15,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre", "Laptop Pro");
    expect(res.body).toHaveProperty("stock", 15);
  });

  // DELETE
  it("Debería eliminar un producto", async () => {
    const res = await request(app).delete(`/api/productos/${productoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "Producto eliminado");
    expect(res.body).toHaveProperty("producto");
    expect(res.body.producto).toHaveProperty("_id", productoId);
  });
});
