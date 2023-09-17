const express = require("express");
const router = express.Router();
const refaccionController = require("../controllers/refacciones");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//importar middleware
const check = require("../middlewares/auth");
const refacciones = require("../models/refacciones");

//CONFIGURACION DE SUBIDA DE ARCHIVO
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
            //Indicar donde es el destino de subida de archivo
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "image" + Date.now() + file.originalname)
},
});

const upload = multer({ storage: almacenamiento });

router.post("/imagen",[upload.single("file0")], refaccionController.imagen);

router.get("/prueba-refaccion", refaccionController.pruebaRefaccion);
router.post("/refaccion", [upload.single("file0")], check.auth, refaccionController.addRefaccion);
router.get("/refacciones", check.auth, refaccionController.listRefaccion);
// router.get("/imagen/:id", refaccionController.imagen);

// router.post("/refaccion/status/:id",check.auth , refaccionController.updateStatus)
// router.get("/refacciones/:busqueda", check.auth ,refaccionController.buscador);

//Exportar router
module.exports = router;
