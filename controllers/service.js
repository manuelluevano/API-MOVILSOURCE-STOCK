//IMPORTAR DEPENDENCIAS Y MODULOS
// const Service = require("../models/service");
// const bcrypt = require("bcrypt");

const Service = require("../models/service");
const { infoUserId } = require("../services/userService");

//IMPORTAR SERVICIOS
// const jwt = require("../services/jwt");
// const { validarRegistro } = require("../helper/validate");

//Acciones de pruebas
const pruebaService = (req, res) => {
  return res.status(200).send({
    mensaje: "Mensaje enviado desde el controlador Servicio",
  });
};

const addService = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  console.log(req.body);

  //REVISAR SI INGRESAMOS LOS PARAMETROS
  if (
    !params.name ||
    !params.telefono ||
    !params.servicio ||
    !params.modelo ||
    !params.marca ||
    !params.precio ||
    !params.observaciones
  ) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //CREAR OBJETO DE USUARIO
  let service_to_save = new Service(params);
  service_to_save.user = req.user.id;

  // Guardar el articulo en la base de datos
  service_to_save
    .save()
    .then((servicioGuardado) => {
      return res.status(200).json({
        //DEVOLVER DATOS DEL SERVICIO
        status: "success",
        mensaje: "Servicio registrado correctamente",
        servicio: servicioGuardado,
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

const listServices = async (req, res) => {
  //Consulta a DB
  try {
    // obtener todos los articulos
    let services = await Service.find({}).sort({
      fecha: 1,
    }).populate("user")


    // if (req.params.ultimos) {
    //   articulos = await Article.find({}).limit(req.params.ultimos);
    // }

    if (!services.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado articulos",
      });
    }

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: services.length,
      services,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

//EXPORTAR ACCIONES
module.exports = {
  pruebaService,
  addService,
  listServices,
};
