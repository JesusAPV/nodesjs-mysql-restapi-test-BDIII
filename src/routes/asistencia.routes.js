import { Router } from 'express';
import { getAsistencias, getAsistenciaById, createAsistencia, updateAsistencia, deleteAsistencia } from '../controllers/asistencia.controllers.js';

const router = Router();

router.get('/asistencias', getAsistencias);

router.get('/asistencias/:id', getAsistenciaById);

router.post('/asistencias', createAsistencia);

router.put('/asistencias/:id', updateAsistencia);

router.delete('/asistencias/:id', deleteAsistencia);

export default router;
