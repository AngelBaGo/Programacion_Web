const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { jsPDF } = require('jspdf'); // Importar jsPDF
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.text());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoologico'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});



const folder = path.join(__dirname + '/archivosCliente')

const storages = multer.diskStorage({
  destination: path.join(__dirname,'archivosCliente/'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
}); 
const upload = multer({storage:storages}); 


app.use(upload.single('archivo'));



app.get('/animal',(req,res) =>{

  const query = 'SELECT * FROM animal';

    db.query(query, (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los productos' });
        } else {
            res.json(resultado); // Devuelve los productos como JSON
        }
    });

});

app.patch('/formulario',(req,res) =>{


});

app.delete('/formulario',(req,res) =>{


});




app.post('/formulario',(req,res) =>{




  
  const datosFormulario = req.body;
  const archivo = req.file;

  console.log('Datos del formulario:', datosFormulario);
  console.log('Archivo recibido:', archivo);

  const pdf = new jsPDF();
  pdf.text(20, 20, 'Información recibida:');

  Object.entries(datosFormulario).forEach(([key, value], index) => {
      pdf.text(20, 40 + index * 20, `${key}: ${value}`);
  });

    

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="archivo_info.pdf"');
  res.send(Buffer.from(pdf.output('arraybuffer')));
});

   app.listen(8082, () => {
    console.log(`Servidor express escuchando en puerto 8082`)
   });
   