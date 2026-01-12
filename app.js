const express = require("express");
const app     = express();
const PORT    = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let usuarios = [
    { id: 1, nombre: "Ryu", edad: 32, lugarProcedencia: "Japon" },
    { id: 2, nombre: "Chun-Li", edad: 29, lugarProcedencia: "China "},
    { id: 3, nombre: "Guile", edad: 35, lugarProcedencia: "Estados Unidos" },
    { id: 4, nombre: "Dhalsim", edad: 45, lugarProcedencia: "India" },
    { id: 5, nombre: "Blanka", edad: 32, lugarProcedencia: "Brasil" },
];

app.get('/', (req, res) => {
    res.send(`
        <h1>Luchadores Street Fighter</h1>
        <ul>
        ${usuarios.map((usuario) => `<li>Nombre: ${usuario.nombre} 
        | Edad: ${usuario.edad} 
        | Procedencia: ${usuario.lugarProcedencia}</li>`)
         .join('')}
         </ul>
         <form action="/usuarios" method="post">
         <label for"nombre">Nombre</label>
         <input type="text" id="nombre" name="nombre" required>
         <laber for"edad">Edad</label>
         <input type="number" name="edad" required>
         <label for"lugarProcedencia">Lugar de Procedencia</label>
         <input type="text" name="lugarProcedencia" required>
         <button type="submit">Agregar luchador </button>
         </form>
         `);
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const nuevoLuchador = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoLuchador),
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`)
});



