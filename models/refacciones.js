const { Schema, model } = require("mongoose");

const RefaccionesSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  precio: {
   type: String,
   required: true,
  },
  imagen: {
    type: String,
    default: "default.png"
  },
  stock: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
});


module.exports = model("Refaccion", RefaccionesSchema, "refacciones")