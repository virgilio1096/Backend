const express = require('express');
const actualizar= require('../../views/Productos/actualizar');
const agregar= require('../../views/Productos/agregar');
const consultar_todo= require('../../views/Productos/consultar');
const insertar= require('../../views/Productos/insertar');
const router= express.Router();

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
router.put('/actualizar/:id', async (req, res) => {
    var datos=await actualizar.actualizar(req.params.id,req.body);
    res.send(datos)
})
module.exports=router;