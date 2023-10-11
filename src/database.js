const mongoose = require('mongoose');
//const mysql = require('mysql')

const uri = "mongodb+srv://admin:jacko123@cluster0.zvw5bky.mongodb.net/login?retryWrites=true&w=majority";

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Database is connected'))
.catch((err) => console.log('error de conexion',err));

// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'usbw',
//     database : 'contoso'
// })

//connection.connect().then(db => console.log('Database is connected'));

// connection.query('SELECT * FROM empleados', function(err, rows, fields) {
//     if (err) {
//         throw err;
//     }else{
//         console.log('Los empleados son: ', rows[0].Nombre);
//     }
//   });

// connection.end();

