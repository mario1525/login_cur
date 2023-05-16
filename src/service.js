const conexion = require("./mysql");

class login {
  async create(nombre, email, passw) {
    await conexion.query(
      `insert into usuario (nombre, email, passw) values("${nombre}", "${email}", "${passw}")`
    );
    return;
  }

  async authenticate(email, passw) {
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
            if (passw === storedPassword) {
              // Las contraseñas coinciden
              console.log("autenticado");
              return true;
            } else {
              // Las contraseñas no coinciden
              console.log("no es el mismo password ");
              return false;
            }
          } else {
            // No se encontró ningún usuario con el email proporcionado
            console.log("no se encuentra un un susario con ese email ");
            return false;
          }
        }
      }
    );
  }
}

module.exports = login;
