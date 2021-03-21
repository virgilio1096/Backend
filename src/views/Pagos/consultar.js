const database= require('../../conexiones/conexiones');

async function consultar() {
    const insert="select * from Op_Pago";
    let resultados = await new Promise((resolve, reject) => {
        database.db.all(insert,[],(error,rows)=>{
            if(error){
                throw error;        
            }else{
                resolve(rows)
            }
        });
    })
    return resultados
}
async function consultarById(id) {
    const insert="select * from Op_Pago where idOp_Pago="+id;
    let resultados = await new Promise((resolve, reject) => {
        database.db.all(insert,[],(error,rows)=>{
            if(error){
                throw error;        
            }else{
                resolve(rows)
            }
        });
    })
    return resultados
}
exports.consultar=consultar
exports.consultarById=consultarById