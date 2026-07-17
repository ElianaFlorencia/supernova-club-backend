const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ("cors");

//Conexion a la BD
const connection= require ('./db');


const app = express ();
const port = 8888;

app.use (bodyParser.urlencoded ({ extended: true}));
app.use (bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
//CORS para que la API sea usada por otra APP.
/*
app.options ('*', cors());
app.use ((req, res, next) => {
    //cambiar la URL por la APP que la consume.
    res.header ('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header ('Access-Control-Allow-Origin', 'GET,PUT,POST,DELETE');
    res.header ('Access-Control-Allow-Origin', 'Content-Type');
    next();
});
*/



//Iniciamos el servidor
app.listen (port, () => {
    console.log('Servidor iniciado en: http://localhost:' + port);
});

//Importar rutas
app.use(require ("./src/routes/eventoRoute")); //llama a todas las rutas.
app.use(require("./src/routes/usuarioRoute"));
app.use(require("./src/routes/reservaRoute"));
app.use(require("./src/routes/mensajeRoute"));
app.use(require("./src/routes/deporteRoute"));

app.get('/', (req, res) => {
    res.send ('Bienvenida/o a mi sitio');
});

/*
app.get ('/saludo/:nombre', (req, res) => {
    //const nombre = req.params.nombre;
    const {nombre} = req.params;

    res.send ('Hola ' + nombre);
}); */
/*
app.get ('/eventos', async(req, res) => {
     
    const query = `
            SELECT id, nombre, descripcion, cupo
            FROM eventos 
        `;

    try {

        [results] = await connection.query (query);
        res.json ({success: true, results});

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error al intentar recuperar los eventos'});
    }

});

app.get ('/eventos/:ID', async (req, res) => {
    const {ID} = req.params;
    const query = `
        SELECT id, nombre, descripcion, cupo
        FROM eventos
        WHERE id = ?
    `;
     try {

        [results] = await connection.query (query, [ID]);
        if (results.length == 0){
           res.status(404).json({success: false, message: 'El evento no existe'}); 
        }else{
            res.json ({success: true, result: results [0]});
        }
        res.json ({success: true, results});

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error al intentar recuperar los eventos'});
    }
  
});
*/

//Middleware para manejar el Error 404
app.use ((req, res, next) => {
    res.status(404);
    res.send(`
        <h1>404 - Pagina no encontrada </h1>
        <p>Lo sentimos, la pagina que estás buscando no existe.</p>
        <a href="/">Volver a la pagina de inicio </a>
        `);
});