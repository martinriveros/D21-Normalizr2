// dependencies

const express = require("express");
const path = require("path");
const cors = require("cors");
const { Server: HttpServer } = require("http"); // los modulos tienen la clase Server, se renombra.
const { Server: IOServer } = require("socket.io"); // los modulos tienen la clase Server, se renombra.
const { config } = require("./config/index.js"); // no hace falta indicarle index.js, es por defecto.
const serverRoutes = require("./routes/routes.js");
const socketConnection = require("./components/services/socketServices.js");

// inicializations
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer); // se inicializa el servidor socket instanciando el "alias" de Server

// settings

app.use(express.static(path.join(__dirname, "./public/uploads"))); // la ruta para cargar archivos estaticos con el acceso a cualquier ruta. En este caso carga main.js y style.css

app.set("view engine", "ejs");                          // template views engine
app.set("views", path.join(__dirname, "views"));            // views path
app.use(express.static(path.join(__dirname, "./public"))); /// static css and js files for html

app.use(express.json()); // interprets json format in post method
app.use(express.urlencoded({ extended: true })); // interprets json format in post method

app.use(cors(`${config.cors}`)); // Middleware
const PORT = config.port;
// Global variable
// Routes
serverRoutes(app);
socketConnection(io);

httpServer.listen(PORT, () => {
  console.log("server on fire, listening dotenv", PORT, config.email_support);
});
