const { Schema, model } = require("mongoose");

const ServiceSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  telefono: {
   type: String,
   required: true,
  },
  servicio: {
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
  precio:{
    type: String,
    required: true,
  },
  fecha : {
    type: Date,
    default: Date.now
  },
  folio : {
    type: String,
    default: '0000'
  },
  observaciones : {
    type: String,
  }
});


module.exports = model("Service", ServiceSchema, "services")