"use strict"

var express = require("express");
//const {model} = require("mongoose");

var ReservarController = require("../controller/reservar");

var router = express.Router();
 
//Ruta para reservar
router.get('/reserva', ReservarController.list);
router.get('/reserva/:id', ReservarController.find);
router.post('/reserva/save', ReservarController.save);
//Falta buscar
//Falta guardar

//Exportar ruta
module.exports = router;