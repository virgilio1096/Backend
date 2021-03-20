const database= require('../../conexiones/conexiones');
const models= require('../../models/Productos');
const util= require('../../util/util');

async function actualizar(id,columns){
    console.log(conexion);
    var d=""
    var conut=0
    tamano=Object.keys(columns).length;
    if(tamano!=0){
        for(const actializan of models.columns()) {
            dato=actializan.toLowerCase()
            separador=""
            if(conut>0){
                separador=","
            }
            if(columns[dato]){
                d+=separador+actializan+'="'+columns[dato]+'"'
                conut++
            }
        }
        var usuarios='Fecha_Ultima_Modificacion="'+util.getDateTime()+'"';
        var update="update Op_Productos set "+d+","+usuarios+" where idOp_Productos="+id;
        let resultados = await new Promise((resolve, reject) => {
            database.db.all(update,[],(error,rows)=>{
                if(error){
                    throw error;        
                }else{
                    resolve(rows)
                }
            });
        })   
    }
    const update_select="select * from Op_Productos where idOp_Productos="+id;
    let resultados_update = await new Promise((resolve, reject) => {
        database.db.all(update_select,[],(error,rows)=>{
            if(error){
                throw error;
            }else{
                resolve(rows)
            }
        });
    })
    database.db.close()
    return resultados_update
}
exports.actualizar=actualizar