//IMPORTAR DEPENDENCIAS Y MODULOS
const fs = require("fs");

const Refaccion = require("../models/refacciones");
const refacciones = require("../models/refacciones");

//Acciones de pruebas
const pruebaRefaccion = (req, res) => {
  return res.status(200).send({
    mensaje: "Mensaje enviado desde el controlador Refaccion",
  });
};

const addRefaccion = async (req, res) => {
  //SACAR EL ARCHIVO
  let file = req.file;

  console.log("file", file);

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

  //CREAR OBJETO
  const newRefaccion = new Refaccion({
    refaccion: params.refaccion,
    modelo: params.modelo,
    marca: params.marca,
    calidad: params.calidad,
    precio: params.precio,
    stock: params.stock,
    imagen: {
      data: fs.readFileSync("tmp/" + file.filename),
      contentType: "image/jpeg",
    },
  });

  // Guardar el articulo en la base de datos
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


//EXPORTAR ACCIONES
module.exports = {
  pruebaRefaccion,
  addRefaccion,
  listRefaccion,
};
