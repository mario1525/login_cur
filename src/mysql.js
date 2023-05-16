const mysql = require("mysql");
const conexion = mysql.createConnection({
  host: "localhost",
  database: "usuarios",
  user: "root",
  password: "",
});

conexion.connect(function (err) {
  if (err) {
    console.error("Error de conexion: " + err.stack);
    return;
  }
  console.log("Conectado con el identificador " + conexion.threadId);
});

module.exports = conexion;
