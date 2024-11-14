const express = require('express');

const path = require('path');

const app = express();

const pug = require('pug');


app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


//Es una froma de convertir datos
//Si trae json lo que nos este mandando el servidor
app.use(express.json());
//Esto es si trae texto
//Esto es para que agarre el texto del body
app.use(express.text());
//Cuando venga en url encoded
app.use(express.urlencoded({extended:true}));

app.post('/formulario',(req,res) =>{
    //console.log(req.query)
    //res.send('Servidor peticion get')
    console.log(req.body);
    
    res.send(`hola ${req.body.nombre} `)
    //res.render('admin')
});


app.get('/', (req, res) => {
    res.send('Servidor Express contestando')
   });
   app.listen(8082, () => {
    console.log(`Servidor express escuchando en puerto 8082`)
   });
   