import { pool } from '../db.js';

// Obtener todos los proyectos
export const getProyectos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tdproyecto_jp');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener proyecto por ID
export const getProyectoById = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tdproyecto_jp WHERE id_proyecto_jp = ?', [req.params.id]);
    if (result.length === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear proyecto
export const createProyecto = async (req, res) => {
  try {
    const { nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tdproyecto_jp (nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp) VALUES (?, ?, ?, ?, ?)',
      [nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp]
    );
    res.json({ id_proyecto_jp: result.insertId, nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar proyecto
export const updateProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp } = req.body;

    const [result] = await pool.query(
      'UPDATE tdproyecto_jp SET nombre_jp = ?, descripcion_jp = ?, fecha_inicio_jp = ?, fecha_fin_jp = ?, id_departamento_jp = ? WHERE id_proyecto_jp = ?',
      [nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });

    res.json({ id_proyecto_jp: id, nombre_jp, descripcion_jp, fecha_inicio_jp, fecha_fin_jp, id_departamento_jp });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar proyecto
export const deleteProyecto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tdproyecto_jp WHERE id_proyecto_jp = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
