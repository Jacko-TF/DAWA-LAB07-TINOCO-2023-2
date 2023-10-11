//Llamada a app
const app = require('./app');
const port = 3000;

//Conexión a base de datos
require('./database');

async function init(){
    await app.listen(port);
    console.log(`Servidor en el puerto ${port} ....!!!`);
}

init();