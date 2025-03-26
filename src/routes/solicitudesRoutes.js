import { Router } from "express";
import {
    getAllSolicitudes,
    getSolicitudById,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
} from "../controllers/solicitudesController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Solicitudes:   
 *       type: object
 *       required:
 *         - descripcion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la solicitud
 *         numero_solicitud:
 *           type: string
 *           description: Número de solicitud
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
 *           description: Descripción de la solicitud
 *         id_articulo:
 *           type: integer
 *           description: ID del articulo solicitado
 *         cantidad_entregada:
 *           type: number
 *           description: Cantidad entregada de la solicitud
 */

/**
 * @swagger
 * /api/solicitudes:
 *   get:
 *     summary: Obtiene la lista de todas las solicitudes
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista de solicitudes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solicitudes'
 *       500:
 *         description: Error al obtener las solicitudes
 */
router.get("/", getAllSolicitudes);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   get:
 *     summary: Obtiene una solicitud por su ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Detalles de la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitudes'
 *       500:
 *         description: Error al obtener la solicitud
 */
router.get("/:id", getSolicitudById);

/**
 * @swagger
 * /api/solicitudes:
 *   post:
 *     summary: Crea una nueva solicitud
 *     tags: [Solicitudes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_solicitud:
 *                 type: string
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
 *               id_articulo:
 *                 type: integer
 *               cantidad_entregada:
 *                 type: number
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitudes'
 *       500:
 *         description: Error al crear la solicitud
 */
router.post("/", createSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   put:
 *     summary: Actualiza una solicitud existente
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_solicitud:
 *                 type: string
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
 *               id_articulo:
 *                 type: integer
 *               cantidad_entregada:
 *                 type: number
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitudes'
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error al actualizar la solicitud
 */
router.put("/:id", updateSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   delete:
 *     summary: Elimina una solicitud existente
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud eliminada exitosamente
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error al eliminar la solicitud
 */
router.delete("/:id", deleteSolicitud);

export default router;