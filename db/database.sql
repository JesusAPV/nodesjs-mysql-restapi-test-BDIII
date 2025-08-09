CREATE DATABASE IF NOT EXISTS DBnegocio_jp;

USE DBnegocio_jp;


CREATE TABLE tdtrabajador_jp (
    id_jp INT(11) NOT NULL AUTO_INCREMENT,
    Nombre_jp VARCHAR(45) DEFAULT NULL,
    salario_jp INT(5) DEFAULT NULL,
    PRIMARY KEY (id_jp)
);

DESCRIBE tdtrabajador_jp;

INSERT INTO tdtrabajador_jp VALUES 
    (1, 'Martin', 1000),
    (2, 'Ivanna', 2000),
    (3, 'Jesus', 3000),
    (4, 'Benjamin', 4000),
    (5, 'Damian', 5000);