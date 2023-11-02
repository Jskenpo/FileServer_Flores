const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/imas');
  },
  filename: function (req, file, cb) {
    const id = req.params.id; // Obtener el ID de la solicitud
    const filename = `${id}.jpeg`; // Cambiar el nombre de la imagen al ID con el formato .jpg
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('myFile');

exports.uploadFile = (req, res) => {
  // Aquí puedes realizar las operaciones necesarias después de recibir la imagen
  res.send({ data: 'Archivo cargado correctamente' });
};