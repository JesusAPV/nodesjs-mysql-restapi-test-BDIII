import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tdtrabajador_jp')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })

    }
}
export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tdtrabajador_jp WHERE id_jp = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const createEmployees = async (req, res) => {
    const { Nombre_jp, salario_jp } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO tdtrabajador_jp (Nombre_jp, salario_jp) VALUES (?, ?)', [Nombre_jp, salario_jp])
        res.send({
            id: rows.insertId,
            Nombre_jp,
            salario_jp,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
export const deleteEmployees = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tdtrabajador_jp WHERE id_jp = ?', [req.params.id])
        console.log(result)

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const updateEmployees = async (req, res) => {
    const { id_jp } = req.params
    const { Nombre_jp, salario_jp } = req.body
    try {
        const [result] = await pool.query('UPDATE tdtrabajador_jp SET Nombre_jp = IFNULL(?, Nombre_jp), salario_jp = IFNULL(?, salario_jp) WHERE id_jp = ?', [Nombre_jp, salario_jp, id_jp])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee not found'
        })

        const [rows] = await pool.query('SELECT * FROM tdtrabajador_jp WHERE id_jp = ?', [id_jp])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}