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
        stock: 10
      });
   expect([200, 201]).toContain(res.statusCode); // aceptar 200 o 201
  expect(res.body).toHaveProperty("_id");
  productoId = res.body._id; // guardamos el id real
  console.log("Producto creado con ID:", productoId); // debug
});

  // READ (Todos)
  it("Debería obtener todos los productos", async () => {
    const res = await request(app).get("/api/productos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
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
        stock: 15
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre", "Laptop Pro");
  });

  // DELETE
  it("Debería eliminar un producto", async () => {
    const res = await request(app).delete(`/api/productos/${productoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
