const { Schema, model } = require("mongoose");

const RefaccionesSchema = Schema({
  refaccion: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  calidad: {
    type: String,
    required: true,
  },
  precio: {
   type: String,
   required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    default: "default.png"
  },
});


module.exports = model("Refaccion", RefaccionesSchema, "refacciones")