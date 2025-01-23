import express from "express";
import { getAllSolicitudes, getSolicitudById, createSolicitud, updateSolicitud, deleteSolicitud } from "../controllers/solicitudesController.js";
import { uploadRequest } from "../middlewares/configStorageFile.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Solicitud:   
 *       type: object
 *       required:
 *         - descripcion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la solicitud
 *         descripcion:
 *           type: string
 *           description: Descripción de la solicitud
 *         cantidad:
 *           type: integer
 *           description: Cantidad de la solicitud
 *         tipo:
 *           type: string
 *           enum: [Insumo, Bien]
 *           description: Cantidad de la solicitud
 *         estado:
 *           type: string
 *           enum: [En Revision, Aceptado, Rechazado]
 *           description: Estado de la solicitud
 *         archivo:
 *           type: string
 *           format: binary
 *           description: Archivo de la baja
 *         id_usuario_aprobador:
 *           type: integer
 *           description: ID del usuario aprobado
 *         id_usuario_solicitud:
 *           type: integer
 *           description: ID del usuario de la solicitud
 *         id_articulo:
 *           type: integer
 *           description: ID del article de la solicitud
 *         id_numero_inventario:
 *           type: integer
 *           description: ID del inventario de la solicitud
 *         id_numero_almacen:
 *           type: integer
 *           description: ID del almacén de la solicitud
 *         comentario:
 *           type: string
 *           description: Comentarios de la solicitud
 *         tipo_rechazo:
 *           type: string
 *           enum: [Falta de presupuesto, No planeado, Incompleto, Fuera de Plazo]
 *           description: Tipo de rechazo de la solicitud
 *         tipo_proyecto:
 *           type: string
 *           enum: [Radio, Television]
 *           description: Tipo de proyecto de la solicitud
 *         id_propuesta_requicicion:
 *           type: integer
 *           description: ID de la propuesta de requicicion de la solicitud
 *         id_peticion_de_padre:
 *           type: integer
 *           description: ID de la petición de padre de la solicitud
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
 *                 $ref: '#/components/schemas/Solicitud'
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
 *               $ref: '#/components/schemas/Solicitud'
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [En Revision, Aceptado, Rechazado]
 *               archivo:
 *                 type: string
 *                 format: binary
 *               id_usuario_aprobador:
 *                 type: integer
 *               id_usuario_solicitud:
 *                 type: integer
 *               id_articulo:
 *                 type: integer
 *               id_numero_inventario:
 *                 type: integer
 *               id_numero_almacen:
 *                 type: integer
 *               comentario:
 *                 type: string
 *               tipo_rechazo:
 *                 type: string
 *                 enum: [Falta de presupuesto, No planeado, Incompleto, Fuera de Plazo]
 *               tipo_proyecto:
 *                 type: string
 *                 enum: [Radio, Television]
 *               id_propuesta_requicicion:
 *                 type: integer
 *               id_peticion_de_padre:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitud'
 *       500:
 *         description: Error al crear la solicitud
 */
router.post("/", uploadRequest.single("archivo"),createSolicitud);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [En Revision, Aceptado, Rechazado]
 *               archivo:
 *                 type: string
 *                 format: binary
 *               id_usuario_aprobador:
 *                 type: integer
 *               id_usuario_solicitud:
 *                 type: integer
 *               id_articulo:
 *                 type: integer
 *               id_numero_inventario:
 *                 type: integer
 *               id_numero_almacen:
 *                 type: integer
 *               comentario:
 *                 type: string
 *               tipo_rechazo:
 *                 type: string
 *                 enum: [Falta de presupuesto, No planeado, Incompleto, Fuera de Plazo]
 *               tipo_proyecto:
 *                 type: string
 *                 enum: [Radio, Television]
 *               id_propuesta_requicicion:
 *                 type: integer
 *               id_peticion_de_padre:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitud'
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error al actualizar la solicitud
 */
router.put("/:id", uploadRequest.single("archivo") ,updateSolicitud);

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