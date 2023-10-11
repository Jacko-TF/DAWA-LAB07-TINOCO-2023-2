const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('src/public'));

//Llamando al router del controlador
app.use(require('./controllers/authController'));

//Esta constante se recibe en index.js
module.exports = app;