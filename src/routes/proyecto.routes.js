import { Router } from 'express';
import {getProyectos, getProyectoById, createProyecto, updateProyecto, deleteProyecto} from '../controllers/proyecto.controllers.js';

const router = Router();

router.get('/proyectos', getProyectos);

router.get('/proyectos/:id', getProyectoById);

router.post('/proyectos', createProyecto);

router.put('/proyectos/:id', updateProyecto);

router.delete('/proyectos/:id', deleteProyecto);

export default router;
