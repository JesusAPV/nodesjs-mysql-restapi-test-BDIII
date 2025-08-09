import { pool } from '../db.js';

// Obtener todas las asistencias
export const getAsistencias = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tdasistencia_jp');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener asistencia por ID
export const getAsistenciaById = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tdasistencia_jp WHERE id_asistencia_jp = ?', [req.params.id]);
    if (result.length === 0) return res.status(404).json({ message: 'Asistencia no encontrada' });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear asistencia
export const createAsistencia = async (req, res) => {
  try {
    const { id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tdasistencia_jp (id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp) VALUES (?, ?, ?, ?, ?)',
      [id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp]
    );
    res.json({ id_asistencia_jp: result.insertId, id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar asistencia
export const updateAsistencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp } = req.body;

    const [result] = await pool.query(
      'UPDATE tdasistencia_jp SET id_trabajador_jp = ?, id_proyecto_jp = ?, fecha_jp = ?, horas_trabajadas_jp = ?, estado_jp = ? WHERE id_asistencia_jp = ?',
      [id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Asistencia no encontrada' });

    res.json({ id_asistencia_jp: id, id_trabajador_jp, id_proyecto_jp, fecha_jp, horas_trabajadas_jp, estado_jp });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar asistencia
export const deleteAsistencia = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tdasistencia_jp WHERE id_asistencia_jp = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Asistencia no encontrada' });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
