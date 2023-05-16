CREATE TABLE  usuario (
  	id int(11) NOT NULL AUTO_INCREMENT,
  	nombre varchar(70),
    email varchar(50),
    passw varchar(50),    
 	PRIMARY KEY (id)
)

INSERT INTO usuario VALUES ("admin admin ", "admin@unireformada.edu.co", "admin345");