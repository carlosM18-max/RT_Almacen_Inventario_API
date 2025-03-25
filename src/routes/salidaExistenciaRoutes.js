import { Router } from "express";
import {
    getAllExistencias,
    getExistenciaById,
    createExistencia,
    updateExistencia,
    deleteExistencia
} from "../controllers/salidaExistenciaController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SalidaExistencia:
 *       type: object
 *       required:
 *         - direccion_solicitante 
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la salida de existencia 
 *         direccion_solicitante:
 *           type: string
 *           enum:
 *             - Direccion General
 *             - Direccion de Coordinacion Financiera Y Planeacion
 *             - Direccion de Television
 *             - Direccion de Noticias
 *             - Direccion de Radio
 *             - Direccion de Ingenieria
 *             - Direccion de Proyectos Estrategicos
 *             - Organo Interno de Control
 *             - Direccion de Promocion e Intercambio
 *             - Direccion Juridica
 *             - Direccion de Vinculacion
 *             - Imagen
 *             - Estaciones de Radio
 *             - Estaciones de Television
 *           description: Direccion solicitante de la salida de existencia
 *         partida:
 *           type: string
 *           description: Partida de la salida de existencia
 *         unidad_medida:
 *           type: string
 *           enum:
 *             - Pieza
 *             - Paquete
 *             - Caja
 *             - Rollo
 *             - Litro
 *             - Metro
 *             - Kilogramo
 *           description: Unidad de medida de la salida de existencia
 *         descripcion_material:
 *           type: string
 *           description: Descripcion del material de la salida de existencia
 *         cantidad_entregada:
 *           type: number
 *           description: Cantidad entregada de la salida de existencia
 *         fecha_solicitud:
 *           type: string
 *           format: date
 *           description: Fecha de solicitud de la salida de existencia
 */

/**
 * @swagger
 * /api/salidaExistencias:
 *   get:
 *     summary: Obtener todas las salidas de existencias
 *     tags: [SalidaExistencia]
 *     responses:
 *       200:
 *         description: Lista de salidas de existencias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalidaExistencia'
 */
router.get("/", getAllExistencias);

/**
 * @swagger
 * /api/salidaExistencias/{id}:
 *   get:
 *     summary: Obtener una salida de existencia por su ID
 *     tags: [SalidaExistencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la salida de existencia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Salida de existencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalidaExistencia'
 *       404:
 *         description: Salida de existencia no encontrada
 */
router.get("/:id", getExistenciaById);

/** 
 * @swagger
 * /api/salidaExistencias:
 *   post:
 *     summary: Crea una nueva salida de existencia
 *     tags: [SalidaExistencia]
 *     requestBody:
 *       required: true
 *       content:   
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direccion_solicitante:
 *                 type: string
 *                 enum:
 *                   - Direccion General
 *                   - Direccion de Coordinacion Financiera Y Planeacion
 *                   - Direccion de Television
 *                   - Direccion de Noticias    
 *                   - Direccion de Radio
 *                   - Direccion de Ingenieria
 *                   - Direccion de Proyectos Estrategicos
 *                   - Organo Interno de Control
 *                   - Direccion de Promocion e Intercambio
 *                   - Direccion Juridica
 *                   - Direccion de Vinculacion
 *                   - Imagen
 *                   - Estaciones de Radio
 *                   - Estaciones de Television
 *               partida:
 *                 type: string
 *               unidad_medida:
 *                 type: string
 *                 enum:
 *                   - Pieza
 *                   - Paquete
 *                   - Caja
 *                   - Rollo
 *                   - Litro
 *                   - Metro
 *                   - Kilogramo
 *               descripcion_material:
 *                 type: string
 *               cantidad_entregada:
 *                 type: number
 *               fecha_solicitud:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Objeto gasto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalidaExistencia'
 *       500:
 *         description: Error al crear el objeto gasto
 */
router.post("/", createExistencia);

/**
 * @swagger
 * /api/salidaExistencias/{id}:
 *   put:
 *     summary: Actualiza una salida de existencia existente
 *     tags: [SalidaExistencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la salida de existencia
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direccion_solicitante:
 *                 type: string
 *                 enum:
 *                   - Direccion General
 *                   - Direccion de Coordinacion Financiera Y Planeacion
 *                   - Direccion de Television
 *                   - Direccion de Noticias    
 *                   - Direccion de Radio
 *                   - Direccion de Ingenieria
 *                   - Direccion de Proyectos Estrategicos
 *                   - Organo Interno de Control
 *                   - Direccion de Promocion e Intercambio
 *                   - Direccion Juridica
 *                   - Direccion de Vinculacion
 *                   - Imagen
 *                   - Estaciones de Radio
 *                   - Estaciones de Television
 *               partida:
 *                 type: string
 *               unidad_medida:
 *                 type: string
 *                 enum:
 *                   - Pieza
 *                   - Paquete
 *                   - Caja
 *                   - Rollo
 *                   - Litro
 *                   - Metro
 *                   - Kilogramo
 *               descripcion_material:
 *                 type: string
 *               cantidad_entregada:
 *                 type: number
 *               fecha_solicitud:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Salida de existencia actualizada correctamente
 *         content:
 *           application/json:
 *             schema:             
 *               $ref: '#/components/schemas/SalidaExistencia'
 *       404:
 *         description: Objeto gasto no encontrado
 *       500:
 *         description: Error al actualizar la salida de existencia
 */
router.put("/:id", updateExistencia);

/**
 * @swagger
 * /api/salidaExistencias/{id}:
 *   delete:
 *     summary: Elimina una salida de existencia
 *     tags: [SalidaExistencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la salida de existencia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Salida de existencia eliminada exitosamente
 *       404:
 *         description: Salida de existencia no encontrada
 */
router.delete("/:id", deleteExistencia);

export default router;