import { Router } from 'express';
import {getDepartamentos, getDepartamentoById, createDepartamento, updateDepartamento, deleteDepartamento } from '../controllers/departamento.controllers.js';

const router = Router();

router.get('/departamentos', getDepartamentos);

router.get('/departamentos/:id', getDepartamentoById);

router.post('/departamentos', createDepartamento);

router.patch('/departamentos/:id_departamento_jp', updateDepartamento);

router.delete('/departamentos/:id', deleteDepartamento);

export default router;
