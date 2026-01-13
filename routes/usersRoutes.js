const express = require("express");
const route   = express.Router();
let usuarios   = require("../BBDD/usersList")


//GET ALL
route.get("/", (req, res) => res.json(usuarios))

//GET by name
route.get("/:nombre", (req, res) =>{
    const name = req.params.nombre
    const user = usuarios.find(usuario => usuario.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())

    if(!user) {
        res.status(404).json({mensaje: `El usuario ${name} no existe`})
    } else {
        res.json(user)
    }
});

//POST: Create user
route.post("/", (req, res) => {
    const newUser = {
        id: usuarios[usuarios.length - 1].id + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
    usuarios.push(newUser)
    res.redirect("/usuarios")
})


//PUT: Update user
route.put("/:nombre", (req, res) => {
    const name = req.params.nombre
    const user = usuarios.findIndex(usuario => usuario.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())

    if(user === -1) {
        res.status(404).json({mensaje: `El usuario ${name} no existe`})
    } else {
        usuarios[user].nombre = req.body.nombre
        usuarios[user].edad = req.body.edad
        usuarios[user].lugarProcedencia = req.body.lugarProcedencia
    }
    res.json(usuarios[user])
})


//DELETE user
route.delete("/:nombre", (req, res) => {
    const name = req.params.nombre
    const user = usuarios.some(usuario => usuario.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())

    if(!user) {
        res.status(404).json({mensaje: `El usuario ${name} no existe`})
    } else {
        usuarios = usuarios.filter(usuario => usuario.nombre.toLocaleLowerCase() !== name.toLocaleLowerCase())
        res.json({mensaje: `El usuario ${name} ha sido eliminado`})
    }
})

module.exports = route

