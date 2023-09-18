//IMPORTAR DEPENDENCIAS Y MODULOS
const fs = require("fs");
const uploadImage = require("../uploadImage");
const refacciones = require("../models/refacciones");
const Refaccion = require("../models/refacciones");

const addRefaccion = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body.refaccion;

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

  const linkImg = await uploadImage(params.imagen)

  //CREAR OBJETO
  const newRefaccion = new refacciones({
    refaccion: params.refaccion,
    modelo: params.modelo,
    marca: params.marca,
    calidad: params.calidad,
    precio: params.precio,
    stock: params.stock,
    imagen: linkImg
  });

  //  Guardar el articulo en la base de datos
  newRefaccion
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

//EXPORTAR ACCIONES
module.exports = {
  addRefaccion,
  listRefaccion,
};
