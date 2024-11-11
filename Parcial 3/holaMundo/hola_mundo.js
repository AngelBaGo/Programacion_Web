const express = require('express');
const app = express();

//Es una froma de convertir datos
//Si trae json lo que nos este mandando el servidor
app.use(express.json());
//Esto es si trae texto
//Esto es para que agarre el texto del body
app.use(express.text());

app.get('/administrativos',(req,res) =>{
    console.log(req.query)
    res.send('Servidor peticion get')
});


app.get('/maestros',(req,res) =>{
    console.log(req.body)
    res.send('Servidor peticion get')
});

app.get('/estudiante/:carrera',(req,res) =>{
    console.log(req.params.carrera)
    console.log(req.query.control)
    res.send('Servidor peticion get')
});

app.post('/empleado',(req,res) =>{
    res.send('Servidor Express contestando la peticion POST')
});

app.all('/empleado',(req,res) =>{
    res.send('Ruta no encontrada')
})

app.get('/', (req, res) => {
 res.send('Servidor Express contestando')
});
app.listen(8082, () => {
 console.log(`Servidor express escuchando en puerto 8082`)
});

