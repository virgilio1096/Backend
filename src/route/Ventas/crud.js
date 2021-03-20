const express = require('express');
const router= express.Router();

router.get('/agregar', (req, res) => {
    res.send('listo');
})

module.exports=router;