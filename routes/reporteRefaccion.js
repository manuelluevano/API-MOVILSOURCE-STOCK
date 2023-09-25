const express = require("express");
const router = express.Router();
const ReporteController = require("../controllers/reporteRefaccion");

router.get("/refaccion", ReporteController.addReport);

//Exportar router
module.exports = router;
