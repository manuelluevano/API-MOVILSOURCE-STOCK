const express = require("express");
const router = express.Router();
const refaccionController = require("../controllers/refacciones");
const multer = require("multer");
const path = require('path')

//importar middleware
const check = require("../middlewares/auth");

//CONFIGURACION DE SUBIDA DE ARCHIVO
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    //Indicar donde es el destino de subida de archivo
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: almacenamiento });

router.get("/prueba-refaccion", refaccionController.pruebaRefaccion);
router.post(
  "/refaccion",
  [upload.single("file0")],
  check.auth,
  refaccionController.addRefaccion
);
router.get("/refacciones", check.auth, refaccionController.listRefaccion);
//Exportar router
module.exports = router;
