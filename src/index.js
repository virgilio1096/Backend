const express = require('express');
const exhbs  = require('express-handlebars');
const morgan = require('morgan');
const path= require('path');
const app = express();
const cors = require('cors')
const database= require('./conexiones/conexiones');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

//const port = 5000
//const routes= require('./routes/routes');
app.set('port', process.env.PORT || 5000);

app.set('views', path.join(__dirname,'views'));

app.use('/Productos',require('./route/Productos/crud'))

app.use('/Ventas',require('./route/Ventas/crud'))

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:`,app.get('port'))
})