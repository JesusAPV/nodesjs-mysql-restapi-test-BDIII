import { pool } from '../db.js';

// Obtener todos los departamentos
export const getDepartamentos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tddepartamento_jp');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtener departamento por ID
export const getDepartamentoById = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tddepartamento_jp WHERE id_departamento_jp = ?', [req.params.id]);
        if (result.length === 0) return res.status(404).json({ message: 'Departamento no encontrado' });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crear departamento
export const createDepartamento = async (req, res) => {
    try {
        const { nombre_jp, ubicacion_jp, presupuesto_jp, fecha_creacion_jp, id_responsable_jp } = req.body;
        const [result] = await pool.query(
            'INSERT INTO tddepartamento_jp (nombre_jp, ubicacion_jp, presupuesto_jp, fecha_creacion_jp, id_responsable_jp) VALUES (?, ?, ?, ?, ?)',
            [nombre_jp, ubicacion_jp, presupuesto_jp, fecha_creacion_jp, id_responsable_jp]
        );
        res.json({ id_departamento_jp: result.insertId, nombre_jp, ubicacion_jp, presupuesto_jp, fecha_creacion_jp, id_responsable_jp });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar departamento

export const updateDepartamento = async (req, res) => {
    try {
        const { id_departamento_jp } = req.params;
        const { nombre_jp, ubicacion_jp, presupuesto_jp, fecha_creacion_jp, id_responsable_jp } = req.body;

        const [result] = await pool.query(
            `UPDATE tddepartamento_jp SET 
        nombre_jp = COALESCE(?, nombre_jp), 
        ubicacion_jp = COALESCE(?, ubicacion_jp), 
        presupuesto_jp = COALESCE(?, presupuesto_jp), 
        fecha_creacion_jp = COALESCE(?, fecha_creacion_jp), 
        id_responsable_jp = COALESCE(?, id_responsable_jp)
      WHERE id_departamento_jp = ?`,
            [nombre_jp, ubicacion_jp, presupuesto_jp, fecha_creacion_jp, id_responsable_jp, id_departamento_jp]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'Departamento no encontrado' });

        const [rows] = await pool.query('SELECT * FROM tddepartamento_jp WHERE id_departamento_jp = ?', [id_departamento_jp]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar departamento
export const deleteDepartamento = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tddepartamento_jp WHERE id_departamento_jp = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Departamento no encontrado' });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
