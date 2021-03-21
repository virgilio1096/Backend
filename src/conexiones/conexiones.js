const sqlite3=require('sqlite3').verbose();
const path=require('path');

const db_name=path.join("base/Tienda.db");

const db= new sqlite3.Database(db_name,error=>{
    if(error){
        throw error
    }else{
        console.log('abierta la BD')
    }
})
const Op_Productos="CREATE TABLE IF NOT EXISTS Op_Productos(\
    idOp_Productos INTEGER PRIMARY KEY AUTOINCREMENT,\
    Nombre varchar(200)NOT NULL,\
    Codigo INTEGER(10) NOT NULL,\
    Precio DOUBLE(20) NOT NULL,\
    Cantidad INTEGER NOT NULL,\
    status TYNYIN(4) NOT NULL,\
    Fecha_Creacion DATETIME NOT NULL,\
    Usuario_Creacion varchar(100) NOT NULL,\
    Fecha_Ultima_Modificacion DATETIME NOT NULL,\
    Usuario_Ultima_Modificacion varchar(100) NOT NULL)";
db.run(Op_Productos,error=>{
    if(error){
        throw error
    }else{
        console.log('se creo la tabla Op_Productos')
    }
})
const Op_Pago="CREATE TABLE IF NOT EXISTS Op_Pago(\
    idOp_Pago INTEGER PRIMARY KEY AUTOINCREMENT,\
    idOp_Productos INTEGER NOT NULL,\
    Cliente varchar(100) NOT NULL,\
    Cantidad INTEGER NOT NULL,\
    Precio DOUBLE(20) NOT NULL,\
    status TYNYIN(4) NOT NULL,\
    Fecha_Creacion DATETIME NOT NULL,\
    Usuario_Creacion varchar(100) NOT NULL,\
    Fecha_Ultima_Modificacion DATETIME NOT NULL,\
    Usuario_Ultima_Modificacion varchar(100) NOT NULL,\
    FOREIGN KEY(idOp_Productos)REFERENCES Op_Productos(idOp_Productos))";
db.run(Op_Pago,error=>{
    if(error){
        throw error
    }else{
        console.log('se creo la tabla Op_Pago')
    }
})

exports.db=db