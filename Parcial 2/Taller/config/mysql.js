const db = require ('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eventos_db',
    port: 3306,
});

connection.connect((err) => {
    if(err) throw err;
    console.info('Conectado a la base de datos MYSQL');
})

module.exports

