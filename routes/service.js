const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/service");

//importar middleware
const check = require("../middlewares/auth");

//DEFINIR RUTAS
router.get("/prueba-servicio",  ServiceController.pruebaService);
router.post("/servicio",check.auth , ServiceController.addService)
router.get("/servicios",check.auth , ServiceController.listServices)
router.post("/servicio/status/:id",check.auth , ServiceController.updateStatus)
router.get("/servicios/:busqueda", check.auth ,ServiceController.buscador);



//Exportar router
module.exports = router;
