const express = require('express');
const router= express.Router();

const agregar= require('../../views/Productos/agregar');
const consultar_todo= require('../../views/Productos/consultar');
const insertar= require('../../views/Productos/insertar');

router.get('/agregar', (req, res) => {
    agregar.agregar();
})
router.get('/consultar', async (req, res) => {
    var datos=await consultar_todo.consultar();
    res.send(datos)
})
router.get('/consultar/:id', async (req, res) => {
    var datos=await consultar_todo.consultarById(req.params.id);
    res.send(datos)
})
router.post('/insertar', async (req, res) => {
    var datos=await insertar.insertar(req.body);
    console.log(datos)
    res.send(datos)
})
module.exports=router;