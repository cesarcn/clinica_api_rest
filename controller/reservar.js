"use strict"

//const res = require("express/lib/response");
var client = require("../database/db");
var db = client.db("clinicabd");
 
var controller = {
    // listar
    list: function (req, res) {
        console.log("----------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("reservar").find().toArray(
            (error, dataReservar) => {
                if (error || !dataReservar) {
                    return res.status(404).send({
                        message: "No se encontraron las reservas"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        reservar: dataReservar
                    });
                }
            }
        );
    },
    //Buscar
    find: function (req, res) {
        console.log("----------");
        console.log("ENTRANDO A LA FUNCION FIND");
        console.log("id:" + req.params.id);
        db.collection("reservar").find({ pacienteId: parseInt(req.params.id) }).toArray(
            (error, dataReservar) => {
                if (error || !dataReservar) {
                    return res.status(404).send({
                        message: "No se encontro el producto"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        reservar: dataReservar[0]
                    });
                }
            }

        );
    },

    //Guardar
    save: function (req, res) {
        console.log("----------");
        console.log("ENTRANDO A LA FUNCION SAVE");
        console.log(req.body);
        if (req.body.pacienteId == "0") {
            console.log("ENTRANDO A NUEVO");
            db.collection("reservar").count().then(
                countReservar => {
                    var reservar = {}
                    reservar.pacienteId = countReservar + 1;
                    reservar.nombre = req.body.nombre;
                    reservar.especialidad = req.body.especialidad;
                    reservar.seguro = req.body.seguro;
                    db.collection("reservar").insertOne(reservar,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo reservar"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "succes",
                                    reservar: result
                                });
                            }
                        }
                    );
                }
            );
        } else {
            console.log("ENTRANDO A EDITAR");
            var reservar = {}
            reservar.pacienteId = parseInt(req.body.pacienteId);
            reservar.nombre = req.body.nombre;
            reservar.especialidad = req.body.especialidad;
            reservar.seguro = req.body.seguro;
            console.log(reservar);
            db.collection("reservar").updateOne({ pacienteId: { $eq: parseInt(req.body.pacienteId) } },
                                                 { $set: reservar },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar la reserva"
                        });
                    } else {
                        return res.status(200).send({
                            message: "succes",
                            reservar: result
                        });
                    }
                }
            )
        }
    }
}

// exportar modulo
module.exports = controller;