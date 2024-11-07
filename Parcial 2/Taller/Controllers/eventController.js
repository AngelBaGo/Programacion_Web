const db = require('../config/mysql')

const{
    selectEventos,
    selectEvento,
    updateEvento,
    insertEvento,
    deleteEvento
} = require('../dal/mysql'); //('../dal/local'); 


exports.getEvento = async (req,res) => {
    const {id} = req.params;

    const evento = await selectEvento(id);
    if(!evento){
        res.status(404).json('El evento no existe')
    }
    else{
        res.status(200).json(evento)
    }
    
    
    //db.query('SELECT id,nombre,descripcion * FROM eventos WHERE id= ?', [id] , (err,results) =>{
     //   if(err) return res.status(500).json(err);
       // res.status(200).json(results);
    //})
    
    //res.status(200).json(eventos.find(evento => evento.id == id));


}

exports.getEventos = async (req,res) => {


    const eventos = await selectEventos();
    //console.log(eventos);
    res.status(200).json(eventos);


   // db.query('SELECT * FROM eventos',(err,results) =>{
    //    if(err) return res.status(500).json(err);
     //   res.status(200).json(results);
   // })

   
    //res.status(200).json(eventos);
}

exports.editEvento = async (req,res) => {

    const{id} = req.params;
    const {nombre,descripcion} = req.body;
 
    const filasAfectadas= await updateEvento(id,nombre,descripcion,fecha,lugar);
    res.status(200).json('Se modificaron' + filasAfectadas + 'filas')

   
   
    if(!editId){
        res.status(404).json('no existe el id')
    }else{
        res.status(200).json('se realizaron modificaciones en el evento' + editId);
    }

    //const evento = eventos.find(evento => evento.id == id);

    //evento.nombre = nombre;
    //evento.descripcion = descripcion;

    //console.info(eventos);

    //res.status(200).json('se realizaron cambios en el evento' + id);
} 

exports.createEvento = (req,res) => {

    //const{nombre,descripcion} = req.body;

    const{nombre,descripcion,fecha,lugar} = req.body;

    if(!nombre){
        res.status(400).json('El nombre no es valido');
        return;
    }
    if(!descripcion){
        res.status(400).json('La descripcion no es valida')
        return;
    }
    if(!lugar){
        res.status(400).json('el lugar no es valida')
        return;
    }
    if(!fecha){
        fecha = new Date();
    }

    const id = insertEvento(nombre,descripcion,fecha,lugar);




    //const id = eventos.length + 1;

    //const evento = {
      //  id,
        //nombre,
        //descripcion
    //};

    //eventos.push(evento);

    //console.info(eventos);

    res.status(200).json('se creo el evento: ' + nombre + 'con id: ' + id);
}

exports.deleteEvento = async (req,res) => {

   
    
    try{
        const {id} = req.params;
        const filasAfectadas= await deleteEvento(id);

        if(filasAfectadas == 1){
            res.status(200).json('Se elimino el evento' + id)

        }
        else{
            res.status(404).json('No se afecto ninguna fila')
        }

       // const nombre = eventos.find(evento => evento.id == id).nombre;

        //eventos = eventos.filter(evento=> evento.id != id);
    
    
    
        res.status(200).json('se elimino el evento' + nombre)
    }catch(error){
        console.log(error.message)
        res.status(400).json(error.message)

    }
    
   
}
