const express = require("express");
const router = express.Router();
const refaccionController = require("../controllers/refacciones");

//importar middleware
const check = require("../middlewares/auth");

router.post("/refaccion", refaccionController.addRefaccion);
router.get("/refacciones", check.auth, refaccionController.listRefaccion);
router.get("/refacciones/:busqueda" ,refaccionController.buscador);

//Exportar router
module.exports = router;
