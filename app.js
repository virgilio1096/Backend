const express = require('express')
const app = express()
const port = 5000
const puppeteer = require('puppeteer');
const cors = require('cors')
const fs = require('fs');
const sqlite3=require('sqlite3').verbose();
const path=require('path');

app.use(cors())

const db_name=path.join(__dirname,"db","base.db");
const db= new sqlite3.Database(db_name,error=>{
    if(error){
        throw error
    }else{
        console.log('si sqlite3')
    }
})
const sql_create="CREATE TABLE IF NOT EXISTS productos (id_productos INTEGER PRIMARY KEY AUTOINCREMENT,categoria varchar(200) NOT NULL,id varchar(200) NOT NULL,nombre varchar(200) NOT NULL,autor varchar(200) NOT NULL,url varchar(200) NOT NULL,valoracion varchar(100) NOT NULL,numero_valoracion varchar(100) NULL)";
db.run(sql_create,error=>{
    if(error){
        throw error
    }else{
        console.log('se creo la tabla')
    }
})
const buscar = async () => {
    try {
        var select="select * from productos";
        let resultados = await new Promise((resolve, reject) => {
                db.all(select,[],(error,rows)=>{
                    if(error){
                        throw error;        
                    }else{
                        resolve(rows);
                    }
            });
        });
        return resultados
    } catch (error) {
        console.log(error);
    }
}
async function datos(){
    var datosBD= await buscar();
    const nombres_existen=[];
    const autor_existen=[];
    for (const DB of datosBD) {
            nombres_existen.push(DB.nombre);
            autor_existen.push(DB.autor);
    }
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.com.mx/gp/bestsellers/?ref_=nav_cs_bestsellers');
    const html = await page.content();
    fs.writeFile('page.html', html, function(err) {
        if (err) throw err;
        console.log('Html Saved');
    });
    let divs = [];
    divs = await page.$$('div[class="zg_homeWidget"] > div');

    console.log("divs lenght = " + divs.length);
    const articles = [];
    var productos=[];
    var constar=0;
    const  nombre_categoria=[];
    const  array_prudctos=[];
    for (const div of divs) {
        try{
            var imageUrl='';
            var nombre='';
            var categoria = await div.$eval('a', (element) => element.innerText);
            var titulo="Ver más Los más vendidos en ";
            if(categoria.indexOf(titulo) > -1){
                categoria=categoria.replace(titulo,'');
                constar++;
                nombre_categoria.push({'nombre':categoria,'contador_id':constar});
            }else{
                categoria=constar;
                var imageUrl ='';
                var nombre = '';
                var autor = '';
                var estrellas='';
                var cantidad_valoracion=''
                var id='';
                id = await div.$eval('div[class="a-section a-spacing-none p13n-asin"]', element => element.getAttribute("data-p13n-asin-metadata"));
                try {
                    nombre = await div.$eval(("a"), (element) => element.innerText);
                } catch (error) {

                }
                try {
                    imageUrl = await div.$eval(("img"), (element) => element.getAttribute("src"));
                } catch (error) {

                }
                try {
                    autor = await div.$eval('span[class="a-size-small a-color-base"]', element => element.innerText)
                } catch (error) {

                }
                try {
                    cantidad_valoracion = await div.$eval('a[class="a-size-small a-link-normal"]', element => element.innerText);
                } catch (error) {

                }
                try {
                    estrellas = await div.$eval('span[class="a-icon-alt"]', element => element.innerText);
                } catch (error) {

                }
                if(!(nombres_existen.indexOf(nombre) > -1  && autor_existen.indexOf(autor) > -1)){
                    array_prudctos.push(
                        {
                            'categoria':categoria,
                            'id':JSON.parse(id).asin,
                            'nombre':nombre,
                            'url':imageUrl,
                            'autor':autor,
                            'estrellas':estrellas.charAt(0)+estrellas.charAt(1)+estrellas.charAt(2),
                            'cantidad_valoracion':cantidad_valoracion
                        }
                    );
                }
            }
        }catch(error){
            console.log('error',error)
        }
        
    }
    for (const titulos of nombre_categoria) {
        try {
            var titular=titulos.nombre;
            array_prudctos.forEach(element => {
                if(titulos.contador_id==element.categoria){
                    var insert="INSERT INTO productos (categoria, id, nombre, autor, url, valoracion, numero_valoracion) VALUES('"+titular+"','"+element.id+"', '"+element.nombre+"','"+element.autor+"', '"+element.url+"', '"+element.cantidad_valoracion+"', '"+element.estrellas+"')";
                    db.all(insert,[],(error,rows)=>{
                        if(error){
                            throw error;        
                        }else{
                            articles.push(rows);
                        }
                    })
                }
            })
        } catch (error) {
            console.log("error: ", err);
        }
    }
    await browser.close()
    return articles;
}
const handleFetch = async () => {
    try {
        var select="select * from productos group by categoria";
        const datos_buscados=[]
        let c1 = await new Promise((resolve, reject) => {
                db.all(select,[],(error,rows)=>{
                    if(error){
                        throw error;        
                    }else{
                        resolve(rows);
                    }
            });
        });
        for (const categorias_id of c1) {
            var select_id="select * from productos where categoria='"+categorias_id.categoria+"'";
            const products=[];
            let c2 = await new Promise((resolve, reject) => {        
                    db.all(select_id,[],(error,rowss)=>{
                        if(error){
                            throw error;        
                        }else{
                            rowss.forEach( xs => {
                                products.push({
                                        'id':xs.id,
                                        'name':xs.nombre,
                                        'author':xs.autor,
                                        'coverImage':xs.url,
                                        'rating':{
                                            'total':xs.valoracion,
                                            'value':xs.numero_valoracion
                                        }
                                })
                            })
                            resolve({'category':categorias_id.categoria,'products':products});
                        }
                    }); 
            }); 
            datos_buscados.push(c2)
        }
        return datos_buscados;
    } catch (error) {
        console.log(error);
    }
}

const eliminar = async () => {
    try {
        var delect="DELETE FROM productos";
        let resultados = await new Promise((resolve, reject) => {
            db.all(delect,[],(error,rows)=>{
                if(error){
                    throw error;        
                }else{
                    resolve('se elimino con exito');;
                }
            })
        });
        return resultados
    } catch (error) {
        console.log(error);
    }
}
app.get('/consultar_normal', (req, res) => {
    var select="select * from productos";
    const productos=[];
    db.all(select,[],(error,rows)=>{
        if(error){
            throw error;        
        }else{
            rows.forEach( x => {
                productos.push(
                    {
                        'id_productor':x.id_productos,
                        'categoria':x.categoria,
                        'id':x.id,
                        'name':x.nombre,
                        'author':x.autor,
                        'coverImage':x.url,
                        'total':x.valoracion,
                        'value':x.numero_valoracion
                    }
                  )
            })
        res.json(productos);
        }
    })
})
app.post('/insert', (req, res) => {
    datos()
        .then((articles) => {
            if(articles.length>0){
                res.json('se insertaron con exito a la tabla: '+articles.length+" registros");
            }else{
                res.json('No se encontraron registros nuevos');
            }
        })
        .catch((err) => console.log(err));
})
app.get('/consultar_compleja', async(req, res,next) => {
    var datos=await handleFetch();
    res.json(datos);
})
app.put('/eliminar', async(req, res,next) => {
    var mensaje=await eliminar();
    res.json(mensaje);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})