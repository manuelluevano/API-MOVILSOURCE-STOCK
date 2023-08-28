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
    type: String,
  },
  folio : {
    type: String,
    default: '0000'
  },
  observaciones : {
    type: String,
  },
  status : {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
});


module.exports = model("Service", ServiceSchema, "services")