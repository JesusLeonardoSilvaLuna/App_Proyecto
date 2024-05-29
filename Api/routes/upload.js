const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Especifica la carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único basado en la fecha actual y el nombre original del archivo
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Ruta para la carga de archivos
app.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
  }
  res.json({ filename: req.file.filename });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
