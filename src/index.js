const express = require('express');
const exhbs  = require('express-handlebars');
const morgan = require('morgan');
const path= require('path');
const app = express();
const database= require('./conexiones/conexiones');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const port = 5000
//const routes= require('./routes/routes');
app.set('port', process.env.PORT || 5000);

// const insert="INSERT INTO Op_Productos(\
//             Nombre,\
//             Codigo,\
//             Precio,\
//             Cantidad,\
//             status,\
//             Fecha_Creacion,\
//             Usuario_Creacion,\
//             Fecha_Ultima_Modificacion,\
//             Usuario_Ultima_Modificacion)\
//             VALUES('avena','1234567891','12.50','10','1','2021-03-21','vtolentino','2021-03-21','vtolentino')";
// database.db.all(insert,[],(error,rows)=>{
//     if(error){
//         throw error;        
//     }else{
//         console.log(error)
//     }
// });
app.set('views', path.join(__dirname,'views'));

app.use('/Productos',require('./route/Productos/crud'))

app.use('/Ventas',require('./route/Ventas/crud'))

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:`,app.get('port'))
})