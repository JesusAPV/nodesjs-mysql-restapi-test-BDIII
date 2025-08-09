import express from 'express'
import  indexRoutes from './routes/index.routes.js'
import employeesRoutes from './routes/employees.routes.js'
import departamentoRoutes from './routes/departamento.routes.js';
import proyectoRoutes from './routes/proyecto.routes.js';
import asistenciaRoutes from './routes/asistencia.routes.js';

import {PORT} from './config.js'

const app = express()


app.use(express.json())

app.use(indexRoutes)
app.use('/api/trabajadores', employeesRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/asistencias', asistenciaRoutes);


app.use((req, res, next)  => {
    res.status(404).json ({
        message: 'endpoint not foung'
    })
})

export default app;