const express = require('express');
const app = express();
const mysql = require("mysql");
const path = require('path');

let conexion = mysql.createConnection({
    host: "localhost",
    database: "menu-master2",
    user: "root",
    password: ""
});

app.set("view engine", "ejs");
app.set('views', 'C:\\Users\\ACER\\Desktop\\yoshua\\MENU_MASTER\\vistas');

app.use('/BACKEND', express.static(path.join(__dirname, '/public/BACKEND')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Renderiza la página "pagina2.ejs"
app.get('/pagina2', (req, res) => {
    res.render('pagina2');
});

app.get("/", function(req, res) {
    res.render("login"); // Renderiza el formulario de inicio de sesión
});

app.get("/registro", function(req, res) {
    res.render("formulario_registro"); // Renderiza el formulario de registro
});

app.get("/seccion_mesas", function(req, res) {
    res.render("seccion_mesas"); // Renderiza el formulario de registro
});

app.get("/mesas", function(req, res) {
    res.render("mesas"); // Renderiza el formulario de registro
});

// Ruta para validar el inicio de sesión
app.post("/login", function(req, res) {
    const { nombre_usuario, password } = req.body;

    // Consulta a la base de datos para buscar el usuario
    let consultarUsuario = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND password = ?";
    conexion.query(consultarUsuario, [nombre_usuario, password], function(error, results) {
        if (error) {
            console.error("Error al buscar usuario:", error);
            res.status(500).send("Error interno del servidor");
        } else {
            if (results.length > 0) {
                // Usuario y contraseña válidos
                res.redirect("/pagina2"); // Redirige al usuario a la página deseada
            } else {
                // Usuario o contraseña incorrectos
                res.status(401).send("Usuario o contraseña incorrectos");
            }
        }
    });
});

app.post("/validar", function(req, res) {
    const datos = req.body;

    let nombre = datos.nombre;
    let apellido = datos.apellido;
    let documentoid = datos.documentoid;
    let telefono = datos.telefono;
    let direccion = datos.direccion;
    let fecha_registro = datos.fecha_registro;
    let password = datos.password;
    let nombre_usuario = datos.nombre_usuario;

    let registrar = "INSERT INTO usuarios(nombre, apellido, documentoid, telefono, direccion, fecha_registro, password,nombre_usuario) VALUES ('"+nombre+"', '"+apellido+"', '"+documentoid+"','"+telefono+"', '"+direccion+"', '"+fecha_registro+"', '"+password+"','"+nombre_usuario+"')";

    conexion.query(registrar, function(error) {
        if (error) {
            console.error("Error al insertar datos:", error);
            res.status(500).send("Error interno del servidor");
        } else {
            console.log("Datos almacenados correctamente");
            res.send("Datos almacenados correctamente");
        }
    });
});
  
// Conectar a la base de datos
conexion.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión establecida con la base de datos.');
});

// Escucha en el puerto 5000
app.listen(5000, function() {
    console.log("El servidor está escuchando en http://localhost:5000");
});
