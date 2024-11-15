const express = require('express');
const multer = require('multer');

const path = require('path');

const app = express();
const cors = require('cors');

const pug = require('pug');


//app.set('view engine','pug');
//app.set('views',path.join(__dirname,'views'));


//Es una froma de convertir datos
//Si trae json lo que nos este mandando el servidor
app.use(express.json());
app.use(cors());
//Esto es si trae texto
//Esto es para que agarre el texto del body
//app.use(express.text());
//Cuando venga en url encoded
const folder = path.join(__dirname + '/archivos')
//const upload = multer({dest:folder}); 
const upload = multer({storage:multer_storage}); 

const multer_storage = multer.diskStorage({
    destination: path.join(__dirname, '../archivos'),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
app.use(upload.single('archivo'));


app.post('/formulario',(req,res) =>{
    //console.log(req.query)
    //res.send('Servidor peticion get')
    console.log(req.body);
    
    res.send(`hola ${req.body.nombre} `)


    //Despues de haber terminado de mandar la peticion,aqui es donde pondras la forma para generar el pdf
    //doc.save patch.join(_dirmanme, "a4.pdf")


    //para regresarle el carchivo al cliente.
    //metodo windows open pa que jale
    //al final debemos de abrir una nueva ventana con el archivo pdf que le generamos
    //con el metodo url.Createobjecturl(Mandamos el archivo pdf) y eso es lo que ponemos en el windows open
    //poner la imagen en el pdf y un textiloo como puso el profe              +.ñ 
    //res.render('admin')
});
   
<form id="form1" method='POST'>

</form>



app.get('/', (req, res) => {
    res.send('Servidor Express contestando')
   });
   app.listen(8082, () => {
    console.log(`Servidor express escuchando en puerto 8082`)
   });
   