//IMPORTAR DEPENDENCIAS Y MODULOS
// const Service = require("../models/service");
// const bcrypt = require("bcrypt");

const Service = require("../models/service");

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

  //Guardar el articulo en la base de datos
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

//EXPORTAR ACCIONES
module.exports = {
  pruebaService,
  addService,
};
