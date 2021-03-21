const express = require('express');
const router= express.Router();
const consultar= require('../../views/Pagos/consultar');
const insertar= require('../../views/Pagos/insertar');
const actualizar= require('../../views/Pagos/actualizar');

router.get('/', async(req, res) => {
    var datos=await consultar.consultar();
    res.send(datos)
})

router.get('/:id', async(req, res) => {
    var datos=await consultar.consultarById(req.params.id);
    res.send(datos)
})

router.post('/', async(req, res) => {
    var datos=await insertar.insertar(req.body);
    res.send(datos)
})

router.put('/:id', async (req, res) => {
    var datos=await actualizar.actualizar(req.params.id,req.body);
    res.send(datos)
})

module.exports=router;