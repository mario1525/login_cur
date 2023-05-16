const express = require("express");
const bodyParser = require("body-parser");

const conexion = require("./src/mysql");

const login = require("./src/service");
const service = new login();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// rutas de login
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  await conexion.query(
    "SELECT * FROM usuario WHERE email = ?",
    [email],
    function (error, results) {
      if (error) {
        console.log("err for query ");
      } else {
        if (results.length > 0) {
          const storedPassword = results[0].passw;
          // Compara el password proporcionado por el usuario con el almacenado
          if (password === storedPassword) {
            // Las contraseñas coinciden
            console.log("autenticado");
            res.redirect("/bienvenido");
          } else {
            // Las contraseñas no coinciden
            console.log("no es el mismo password ");
            res.redirect("/");
          }
        } else {
          // No se encontró ningún usuario con el email proporcionado
          console.log("no se encuentra un un susario con ese email ");
          res.redirect("/");
        }
      }
    }
  );

  // autenticate
  // const auth = await service.authenticate(email, password);
  // if (auth) {
  //   console.log("salio true");
  //   res.redirect("/bienvenido");
  // } else {
  //   console.log("salio false");
  //   res.redirect("/");
  // }
});

//rutas de registro
app.get("/registrar", (req, res) => {
  res.sendFile(__dirname + "/public/registro.html");
});
app.post("/registrar", async (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;
  // cargar a la base de datos
  await service.create(nombre, email, password);
  res.redirect("/");
});

// ruta bienvenido
app.get("/bienvenido", (req, res) => {
  res.sendFile(__dirname + "/public/validado.html");
});

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
