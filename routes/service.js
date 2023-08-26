const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/service");

//importar middleware
// const check = require("../middlewares/auth");

//DEFINIR RUTAS
router.get("/prueba-servicio",  ServiceController.pruebaService);
router.post("/servicio", ServiceController.addService)

//Exportar router
module.exports = router;
