# Back end de scrape a lo mas vendido en amazon

Despues de aver descargado el proyecto favor de correr el siguiente comando para descargar las dependencias

### `npm install`

Cuando termine de descargar ejecutar el siguiente commando para correr el proyecto.

### `nodemon app.js`

La base de datos que utiliza el proyecto se encuentra en la carpeta db y el archivo base.db



En el proyecto se encuentra el archivo apps.js dicho archivo es donde podremos observar todo los endpoint solicitados

El primer endpoint utiliza un petodo put /elimnar en esta ocacion utilice un put ya que en mi trabajo actual no acostubro a elimnar o usar metodos delete en las tablas siempre usamos modificar y estados de baja o activos, para consultar el api en el navegador o en algun programa en mi caso uso insomnia es de la siguiente manera.

El proyecto esta corriendo en el puerto 5000

endpoint http://localhost:5000/eliminar metodo : PUT

![image](https://user-images.githubusercontent.com/19189836/111846579-21b73b00-88d5-11eb-82a0-03ef0adef856.png)

El siguiente endpoint es el de consulta normal que nos regresa los datos de la tabla en un select normal

endpoint http://localhost:5000/consultar_normal metodo : GET

![image](https://user-images.githubusercontent.com/19189836/111846741-722e9880-88d5-11eb-8388-e105761adda0.png)

El tercer endpoint es el que realiza una consulta normal pero manipulando los datos de forma como lo solitaron

endpoint http://localhost:5000/consultar_compleja metodo : GET

![image](https://user-images.githubusercontent.com/19189836/111846849-a7d38180-88d5-11eb-9df5-aafa23e13787.png)

El ultimo endpoint es el que hace el scrape a amazon y aguarda los datos en nuestra tabla sqlite de igual forma si se ejecuta mas de una ves el proceso que agurda en la tabla hace un select a la tabla antes de aguardar y compara los registros nuevos de la vista y si ya existen en la tabla ya no lo aguarda esto es para que no tengamos productos duplicados.

endpoint http://localhost:5000/post metodo : POST

![image](https://user-images.githubusercontent.com/19189836/111847341-9ccd2100-88d6-11eb-9e89-78a77c1ef430.png)

Si se ejcuta de nuevo por error o para ver si hay productos nuevos retorna lo siguiente

![image](https://user-images.githubusercontent.com/19189836/111847402-ba9a8600-88d6-11eb-8ee4-3ba79b9ec9d5.png)

todos los endpoint se encuentran en el archivo app.js que esta en la rais del proyecto

# Nuevos enpoint para proyecto personal de ventas

para poder correr el nuevo proyecto solo ejecuta el comando 

### `npm run test`

Cuando cmienze a correr verificara si existen las dos tablas a usar y si ya existen entonses no las crea

para poder usar los nuevos enpoint se pueden encontrar en la carpeta de router y se consultan de la siguiente manera.

para la consulta normal de todos los productos es http://localhost:5000/productos/ methodo:"GET"

para la consulta de un registro espesifico debemos saber el id http://localhost:5000/productos/1 methodo:"GET"

para la el nuevo registro http://localhost:5000/productos/ methodo: "POST"
dicho metodo recibe los siguientes parametros.
![image](https://user-images.githubusercontent.com/19189836/111894230-1cdab000-89d7-11eb-9f91-064899313b0b.png)

para el poder modifcar algun producto es en http://localhost:5000/productos/1 methodo:"PUT"
debemos saber el id y pasarlo por la url como en el get y pasar los parametros a modificar
![image](https://user-images.githubusercontent.com/19189836/111894260-61664b80-89d7-11eb-870f-427be30d85ef.png)

para consultar las ventas o los pagos realizados es http://localhost:5000/pago/ methodo:"GET"

para poder consultar algun pago espesifico es http://localhost:5000/pago/1

para poder generar un nuevo registro es http://localhost:5000/pago/ methodo:"POST"
dicho metodo recibe los siguientes parametros.
![image](https://user-images.githubusercontent.com/19189836/111894313-e3ef0b00-89d7-11eb-8afc-94c3716159cb.png)

para realizar las modificaciones de algun pago es http://localhost:5000/pago/1 methodo:"PUT"
debemos saber el id y pasarlo por la url como en el get y pasar los parametros a modificar
![image](https://user-images.githubusercontent.com/19189836/111894339-1b5db780-89d8-11eb-98d3-964d552e1b55.png)




