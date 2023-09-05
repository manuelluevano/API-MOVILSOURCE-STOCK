const express = require("express");
const router = express.Router();
const refaccionController = require("../controllers/refacciones");

//importar middleware
const check = require("../middlewares/auth");

//DEFINIR RUTAS
router.get("/prueba-refaccion",  refaccionController.pruebaRefaccion);
router.post("/refaccion",check.auth , refaccionController.addRefaccion)
router.get("/refacciones",check.auth , refaccionController.listRefaccion)
// router.post("/refaccion/status/:id",check.auth , refaccionController.updateStatus)
// router.get("/refacciones/:busqueda", check.auth ,refaccionController.buscador);


//Exportar router
module.exports = router;
    