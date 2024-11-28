const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { jsPDF } = require('jspdf'); // Importar jsPDF
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { body, validationResult } = require('express-validator');

//app.set('view engine','pug');
//app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));

//Es una froma de convertir datos
//Si trae json lo que nos este mandando el servidor
app.use(express.json());
app.use(cors());
//Esto es si trae texto
//Esto es para que agarre el texto del body
app.use(express.text());
//Cuando venga en url encoded

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'formulario'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});


const folder = path.join(__dirname + '/ArchivosCliente')
//const upload = multer({dest:folder});

const storages = multer.diskStorage({
  destination: path.join(__dirname,'ArchivosCliente/'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
}); 
const upload = multer({storage:storages}); 


app.use(upload.single('archivo'));





app.post('/formulario', [
  body('nombre')
      .notEmpty().withMessage('El nombre es obligatorio.')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El nombre solo puede contener letras.'),
  body('apellido')
      .notEmpty().withMessage('El apellido es obligatorio.')
      .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres.')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El apellido solo puede contener letras.'),
  body('Edad')
      .notEmpty().withMessage('La edad es obligatoria.')
      .isInt({ min: 1, max: 120 }).withMessage('La edad debe ser un número entre 1 y 120.'),
],
(req,res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
  }
  const datosFormulario = req.body;
  const archivo = req.file;

  console.log('Datos del formulario:', datosFormulario);
  console.log('Archivo recibido:', archivo);

  const pdf = new jsPDF();
  pdf.text(20, 20, 'Información recibida:');

  Object.entries(datosFormulario).forEach(([key, value], index) => {
      pdf.text(20, 40 + index * 20, `${key}: ${value}`);
  });

  pdf.text(20, 100, `Nombre del archivo: ${archivo.originalname}`);
  pdf.text(20, 120, `Tamaño: ${archivo.size} bytes`);
  pdf.text(20, 140, `Tipo: ${archivo.mimetype}`);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="archivo_info.pdf"');
  res.send(Buffer.from(pdf.output('arraybuffer')));
});
   
app.post('/formularioBase', [
  body('nombre')
      .notEmpty().withMessage('El nombre es obligatorio.')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El nombre solo puede contener letras.'),
  body('apellido')
      .notEmpty().withMessage('El apellido es obligatorio.')
      .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres.')
      .matches(/^[a-zA-Z\s]+$/).withMessage('El apellido solo puede contener letras.'),
  body('Edad')
      .notEmpty().withMessage('La edad es obligatoria.')
      .isInt({ min: 1, max: 120 }).withMessage('La edad debe ser un número entre 1 y 120.'),
],
(req,res) =>{
  const { nombre, apellido, Edad } = req.body;

    if (!nombre || !apellido || !Edad) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    const sql = 'INSERT INTO Datos (nombre, apellido, Edad) VALUES (?, ?, ?)';
    db.query(sql, [nombre, apellido, Edad], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).json({ mensaje: 'Error al guardar los datos en la base de datos.' });
        }

        res.json({ mensaje: 'Datos guardados correctamente.', id: result.insertId });
    });
 
});
   




app.get('/', (req, res) => {
    res.send('Servidor Express contestando')
   });
   app.listen(8082, () => {
    console.log(`Servidor express escuchando en puerto 8082`)
   });
   