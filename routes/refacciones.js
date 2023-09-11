const express = require("express");
const router = express.Router();
const refaccionController = require("../controllers/refacciones");
// const multer = require("multer");
const path = require("path");

//importar middleware
const check = require("../middlewares/auth");

//CONFIGURACION DE SUBIDA DE ARCHIVO
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Images");
//   },
//   filename: (req, file, cb) => {
//     // cb(null, "refaccion-" + Date.now() + "-" + file.originalname);
//       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }  
// });
// const uploads = multer({ storage });
// const storage = multer.diskStorage({
//   destination: 'uploads',
//   filename: (req, file, cb) => {
//       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })

// const upload = multer({ storage });


//DEFINIR RUTAS
// router.use('/upload', express.static(path.resolve('uploads')));
// router.post("/upload", check.auth, upload.single("image"), refaccionController.upload)

router.get("/prueba-refaccion", refaccionController.pruebaRefaccion);
router.post("/refaccion", check.auth, refaccionController.addRefaccion);
router.get("/refacciones", check.auth, refaccionController.listRefaccion);
// router.get("/imagen/:id", refaccionController.imagen);

// router.post("/refaccion/status/:id",check.auth , refaccionController.updateStatus)
// router.get("/refacciones/:busqueda", check.auth ,refaccionController.buscador);

//Exportar router
module.exports = router;
