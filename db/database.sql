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

CREATE TABLE tddepartamento_jp (
  id_departamento_jp INT AUTO_INCREMENT PRIMARY KEY,
  nombre_jp VARCHAR(100) NOT NULL,
  ubicacion_jp VARCHAR(100),
  presupuesto_jp DECIMAL(10, 2),
  fecha_creacion_jp DATE,
  id_responsable_jp INT,
  FOREIGN KEY (id_responsable_jp) REFERENCES tdtrabajador_jp(id_jp)
);


DESCRIBE tddepartamento_jp;

INSERT INTO tddepartamento_jp (nombre_jp, ubicacion_jp, presupuesto_jp, fecha_creacion_jp, id_responsable_jp) VALUES
('Recursos Humanos', 'Edificio A', 50000.00, '2023-01-15', 1),
('Tecnología', 'Edificio B', 150000.00, '2023-02-01', 2),
('Marketing', 'Edificio C', 70000.00, '2023-03-10', 3),
('Ventas', 'Edificio D', 90000.00, '2023-04-20', 4),
('Finanzas', 'Edificio E', 80000.00, '2023-05-05', 5);


CREATE TABLE tdproyecto_jp (
  id_proyecto_jp INT AUTO_INCREMENT PRIMARY KEY,
  nombre_jp VARCHAR(100) NOT NULL,
  descripcion_jp VARCHAR(255),
  fecha_inicio_jp DATE,
  fecha_fin_jp DATE,
  id_departamento_jp INT,
  FOREIGN KEY (id_departamento_jp) REFERENCES tddepartamento_jp(id_departamento_jp)
);


DESCRIBE tdproyecto_jp;

INSERT INTO tdproyecto_jp (nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp) VALUES
('Sistema de Nómina', 'Desarrollo de sistema para gestión de nómina', '2023-06-01', '2023-12-01', 2),
('Campaña Publicitaria', 'Campaña para lanzamiento de nuevo producto', '2023-07-01', '2023-09-30', 3),
('Mejora de Ventas', 'Proyecto para aumentar las ventas en línea', '2023-05-15', '2023-11-15', 4),
('Análisis Financiero', 'Análisis y optimización financiera anual', '2023-01-01', '2023-12-31', 5),
('Capacitación RH', 'Programa de capacitación para empleados', '2023-03-01', '2023-08-31', 1);


CREATE TABLE tdasistencia_jp (
  id_asistencia_jp INT AUTO_INCREMENT PRIMARY KEY,
  id_trabajador_jp INT,
  id_proyecto_jp INT,
  fecha_jp DATE,
  horas_trabajadas_jp DECIMAL(5, 2),
  estado_jp VARCHAR(50),
  FOREIGN KEY (id_trabajador_jp) REFERENCES tdtrabajador_jp(id_jp),
  FOREIGN KEY (id_proyecto_jp) REFERENCES tdproyecto_jp(id_proyecto_jp)
);


DESCRIBE tdasistencia_jp;

INSERT INTO tdasistencia_jp (id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp) VALUES
(1, 1, '2023-06-05', 8.00, 'Presente'),
(2, 1, '2023-06-05', 7.50, 'Presente'),
(3, 2, '2023-07-10', 6.00, 'Presente'),
(4, 3, '2023-05-20', 8.00, 'Justificado'),
(5, 4, '2023-01-15', 8.00, 'Ausente');
