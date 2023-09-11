//IMPORTAR DEPENDENCIAS Y MODULOS
const fs = require("fs");

const Refaccion = require("../models/refacciones");

//Acciones de pruebas
const pruebaRefaccion = (req, res) => {
  return res.status(200).send({
    mensaje: "Mensaje enviado desde el controlador Refaccion",
  });
};

const addRefaccion = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  console.log(req.body);

  //REVISAR SI INGRESAMOS LOS PARAMETROS
  if (
    !params.refaccion ||
    !params.modelo ||
    !params.marca ||
    !params.calidad ||
    !params.precio ||
    !params.stock
  ) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //CREAR OBJETO DE REFACCION
  let refaccion_to_save = new Refaccion(params);

  // Guardar el articulo en la base de datos
  refaccion_to_save
    .save()
    .then((refaccionGuardada) => {
      return res.status(200).json({
        //DEVOLVER DATOS DE LA REFACCION
        status: "success",
        mensaje: "Refaccion registrada correctamente",
        refaccion: refaccionGuardada,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        //devolver error
        status: "error",
        mensaje: "No se ha guardado el servicio: " + error.message,
      });
    });
};

const listRefaccion = async (req, res) => {
  //Consulta a DB
  try {
    // obtener todos los articulos
    let refacciones = await Refaccion.find({}).sort({
      fecha: 1,
    });

    if (!refacciones.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado refacciones",
      });
    }

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: refacciones.length,
      refacciones,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

// const upload = async (req, res) => {
//   //RECOGER EL ID
//   console.log(req.body);

//   const idProducto = req.body;

//   //RECOGER EL FICHERO DE IMAGEN Y COMPROBAR QUE EXISTE
//   if (!req.file) {
//     return res.status(404).json({
//       status: "error",
//       mensaje: "Peticion no incluye la imagen",
//     });
//   }

//   //CONSEGUIR EL NOMBRE DEL ARCHIVO
//   let imagenName = req.file.originalname;

//   //SACAR LA EXTENCION DEL ARCHIVO
//   const imageSplit = imagenName.split(".");
//   const extencion = imageSplit[1];

//   //COMPROBAR LA EXTENCION
//   if (
//     extencion != "jpg" &&
//     extencion != "png" &&
//     extencion != "jpeg" &&
//     extencion != "gif"
//   ) {
//     //SI LA EXTENCION ES DISTINTA A LAS INDICADAS, BUSCAR Y ELIMINAR ARCHIVO
//     const filePath = req.file.path;

//     const fileDelete = fs.unlinkSync(filePath);

//     return res.status(400).json({
//       status: "error",
//       mensaje: "Extencion del fichero invalida",
//     });
//   }

//   //SI ES CORRECTA, GUARDAR IMAGEN EN BD
//   try {
//     let imageUpload = await Refaccion.findOneAndUpdate(
//       { _id: idProducto },
//       { imagen: `${req.file.filename}` },

//       {
//         new: true,
//       }
//     );

//     if (!imageUpload) {
//       return res.status(500).json({
//         status: "Error",
//         mensaje: "Error en la subida de avatar",
//       });
//     }

//     //DEVOLVER RESPUESTA
//     return res.status(200).json({
//       status: "Success",
//       imageUpload,
//       imagen: req.file,
//     });
//   } catch (error) {
//     // console.log(error);
//     return res.status(400).json({
//       status: "Error",
//       mensaje: "Faltan datos para enviar",
//     });
//   }
// };

// const imagen = async (req, res) => {
//   //SACAR EL PARAMETRO DE LA URL
//   // let file = req.params.file;
//   let file = req.params.id;
//   console.log(file);

//   let photo = await Refaccion.findById(file);
//   console.log(photo);

//   return res.status(200).json({
//     status: "Success",
//     photo,
//   });

//   //MONTAR EL PATH REAL DE LA IMAGEN
//   // let filePath = "./uploads/" + file;

//   //COMPROBAR QUE EXISTE
//   // fs.stat(filePath, (error, exists) => {
//   //   if (!exists) {
//   //     return res.status(404).json({
//   //       status: "Error",
//   //       mensaje: "La imagen no existe",
//   //       exists,
//   //     });
//   //   }

//   //   //DEVOLVER EL FILE
//   //   return res.sendFile(path.resolve(filePath));
//   // });
// };

// const updateStatus = async (req, res) => {
//   //RECIBIR EL PARAMETRO DEL ID DEL USUARIO POR URL
//   const id = req.params.id;
//   console.log("ID", id);

//   try {
//     //BUSCAR SERVICIO EN DB
//     let serviceToDB = await Service.findById(id);

//     //VERIFICAR QUE EL ESTADO SEA FALSE
//     const verificarStado = serviceToDB.status;
//     // console.log(verificarStado);

//     if (verificarStado) {
//       return res.status(200).send({
//         status: "Success",
//         message: "El Servicio ya se entrego",
//         service: serviceToDB.status,
//       });
//     }

//     //CAMBIAR ESTADO DE SERVICIO
//     let status = true;
//     serviceToDB.status = status;

//     let serviceUpdateStatus = await Service.findByIdAndUpdate(
//       {
//         _id: id,
//       },
//       serviceToDB,
//       { new: true }
//     );

//     if (!serviceUpdateStatus) {
//       return res.status(500).json({
//         status: "Error",
//         mensaje: "Error al actualziar",
//       });
//     }
//     //MOSTRAR EL SERVICIO
//     return res.status(200).json({
//       status: "Success",
//       message: "Servicio Terminado :)",
//       service: serviceUpdateStatus,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "Error",
//       mensaje: "Error en la consulta",
//       error,
//     });
//   }
// };

// const buscador = async (req, res) => {
//   try {
//   //Sacar el string de busqueda
//   let busqueda = req.params.busqueda;

//   //Find OR // OR = SELECT * FROM
//   services = await Service.find({
//     $or: [
//       { name: { $regex: busqueda, $options: "i" } },
//       { telefono: { $regex: busqueda, $options: "i" } },
//       { servicio: { $regex: busqueda, $options: "i" } },
//       { modelo: { $regex: busqueda, $options: "i" } },
//       { marca: { $regex: busqueda, $options: "i" } },
//       { folio: { $regex: busqueda, $options: "i" } },
//       { observaciones: { $regex: busqueda, $options: "i" } },

//     ],
//   }).sort({fecha: 1}).populate("user"); //Orden

//   if (!services.length > 0) {
//     return res.status(404).json({
//       status: "error",
//       mensaje: "No se han encontrado services",
//     });
//   }

//   //Devolver resultado
//   return res.status(200).send({
//     status: "Success",
//     contador: services.length,
//     services,
//   });
// }
//   catch (error) {
//     return res.status(404).json({
//       status: "Error",
//       mensaje: "Error al buscar",
//     });
//   }
// };

//EXPORTAR ACCIONES
module.exports = {
  pruebaRefaccion,
  addRefaccion,
  listRefaccion,
  // upload,
  // imagen,
  // updateStatus,
  // buscador
};
