//IMPORTAR DEPENDENCIAS Y MODULOS
const Refaccion = require("../models/refacciones");

//IMPORTAR services
// const jwt = require("../services/jwt");
// const { validarRegistro } = require("../helper/validate");

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
    !params.name ||
    !params.tipo ||
    !params.precio ||
    !params.stock ||
    !params.marca 
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
    let refacciones = await Refaccion.find({})
      .sort({
        fecha: 1,
      })


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
  // updateStatus,
  // buscador
};
