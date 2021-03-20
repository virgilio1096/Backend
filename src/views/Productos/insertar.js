const database= require('../../conexiones/conexiones');
const util= require('../../util/util');

async function insertar(datos) {
    if(datos.nombre== undefined || datos.nombre==''){
        throw 'agregar el nombre'        
    }
    if(datos.codigo== undefined || datos.codigo==''){
        throw 'agregar el codigo'        
    }
    if(datos.precio== undefined || datos.precio==''){
        throw 'agregar el precio'        
    }
    if(datos.cantidad== undefined || datos.cantidad==''){
        throw 'agregar el cantidad'        
    }
    if(datos.status== undefined || datos.status==''){
        throw 'agregar el status'        
    }    
    if(datos.usuario_creacion== undefined || datos.usuario_creacion==''){
        throw 'agregar el status'        
    }    
    if(datos.usuario_modificacion== undefined || datos.usuario_modificacion==''){
        throw 'agregar el status'        
    }    
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
                VALUES(\
                '"+datos.nombre+"',\
                '"+datos.codigo+"',\
                '"+datos.precio+"',\
                '"+datos.cantidad+"',\
                '"+datos.status+"',\
                '"+util.getDateTime()+"',\
                '"+datos.usuario_creacion+"',\
                '"+util.getDateTime()+"',\
                '"+datos.usuario_modificacion+"')";
    let resultados = await new Promise((resolve, reject) => {
        database.db.all(insert,[],(error)=>{
            if(error){
                throw error;        
            }else{
                resolve('se agrego de forma correcta')
            }
        });
    })
    return resultados
}
exports.insertar=insertar