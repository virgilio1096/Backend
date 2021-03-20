const database= require('../../conexiones/conexiones');

function agregar(datos) {
    const insert="INSERT INTO Op_Productos(\
                Nombre,\
                Codigo,\
                Precio,\
                Cantidad,\
                status,\
                Fecha_Creacion,\
                Usuario_Creacion,\
                Fecha_Ultima_Modificacion,\
                Usuario_Ultima_Modificacion)\
                VALUES('avena','1234567891','12.50','10','1','2021-03-21','vtolentino','2021-03-21','vtolentino')";
    database.db.all(insert,[],(error,rows)=>{
        if(error){
            throw error;        
        }else{
            console.log('se agrego de forma corrcta')
        }
    });
}
exports.agregar=agregar