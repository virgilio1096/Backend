const database= require('../../conexiones/conexiones');
const util= require('../../util/util');

async function insertar(datos) {
    const mensaje=[];
    try {
        if(datos.producto_id== undefined || datos.producto_id==''){
            mensaje.push('agregar el producto_id');
        }
        if(datos.precio== undefined || datos.precio==''){
            mensaje.push('agregar el precio');
        }
        if(datos.cliente== undefined || datos.cliente==''){
            mensaje.push('agregar el cliente');
        }
        if(datos.cantidad== undefined || datos.cantidad==''){
            mensaje.push('agregar el cantidad');
        }
        if(datos.status== undefined || datos.status==''){
            mensaje.push('agregar el status');
        }    
        if(datos.usuario_creacion== undefined || datos.usuario_creacion==''){
            mensaje.push('agregar el usuario_creacion');
        }    
        if(datos.usuario_modificacion== undefined || datos.usuario_modificacion==''){
            mensaje.push('agregar el usuario_modificacion');
        }
        if(mensaje!=""){
            throw mensaje;
        }
        const insert="INSERT INTO Op_Pago(\
                    idOp_Productos,\
                    Cliente,\
                    Cantidad,\
                    Precio,\
                    status,\
                    Fecha_Creacion,\
                    Usuario_Creacion,\
                    Fecha_Ultima_Modificacion,\
                    Usuario_Ultima_Modificacion)\
                    VALUES(\
                    '"+datos.producto_id+"',\
                    '"+datos.cliente+"',\
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
    } catch (error) {
        return error;
    }
}
exports.insertar=insertar