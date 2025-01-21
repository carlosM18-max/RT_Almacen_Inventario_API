import express from "express";
import { getAllBajas, getBajaById, createBaja, updateBaja, deleteBaja } from "../controllers/bajasController.js";
import { upload } from "../middlewares/configStorageFile.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Baja:
 *       type: object
 *       required:
 *         - tipo
 *         - estado
 *         - archivo
 *         - id_usuario
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la baja
 *         tipo:
 *           type: string
 *           enum: [prestamo, descompuesto, descontinuación]
 *           description: Tipo de baja (préstamo, descompuesto, descontinuación)
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la baja
 *         razon:
 *           type: string
 *           description: Razón de la baja
 *         estado:
 *           type: string
 *           enum: [Revision, Aceptada, Rechazada, Archivado]
 *           description: Estado de la baja
 *         alta_baja:
 *           type: boolean
 *           description: Alta/Baja
 *         archivo:
 *           type: string
 *           format: binary
 *           description: Archivo de la baja
 *         id_confirmacion:
 *           type: integer
 *           description: ID de confirmación
 *         id_solicitud_retiro:
 *           type: integer
 *           description: ID de solicitud de retiro
 *         id_articulos:
 *           type: integer
 *           description: ID del bien
 *         id_inventario:
 *           type: integer
 *           description: ID del inventario
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario
 */

/**
 * @swagger
 * /api/bajas:
 *   get:
 *     summary: Obtiene todas las bajas
 *     tags: [Bajas]
 *     responses:
 *       200:
 *         description: Lista de todas las bajas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Baja'
 */
router.get("/", getAllBajas);

/**
 * @swagger
 * /api/bajas/{id}:
 *   get:
 *     summary: Obtiene una baja por su ID
 *     tags: [Bajas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la baja
 *     responses:
 *       200:
 *         description: Detalles de la baja
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Baja'
 *       404:
 *         description: Baja no encontrada
 */
router.get("/:id", getBajaById);

/**
 * @swagger
 * /api/bajas:
 *   post:
 *     summary: Crea una nueva baja
 *     tags: [Bajas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [prestamo, descompuesto, descontinuación]
 *               fecha:
 *                 type: string
 *                 format: date
 *               razon:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Revision, Aceptada, Rechazada, Archivado]
 *               alta_baja:
 *                 type: boolean
 *               archivo:
 *                 type: string
 *                 format: binary
 *               id_confirmacion:
 *                 type: integer
 *               id_solicitud_retiro:
 *                 type: integer
 *               id_articulos:
 *                 type: integer
 *               id_inventario:
 *                 type: integer
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Baja creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Baja'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", upload.single("archivo"), createBaja);

/**
 * @swagger
 * /api/bajas/{id}:
 *   put:
 *     summary: Actualiza una baja existente
 *     tags: [Bajas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la baja
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [prestamo, descompuesto, descontinuación]
 *               fecha:
 *                 type: string
 *                 format: date
 *               razon:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Revision, Aceptada, Rechazada, Archivado]
 *               alta_baja:
 *                 type: boolean
 *               archivo:
 *                 type: string
 *                 format: binary
 *               id_confirmacion:
 *                 type: integer
 *               id_solicitud_retiro:
 *                 type: integer
 *               id_articulos:
 *                 type: integer
 *               id_inventario:
 *                 type: integer
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Baja actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Baja'
 *       404:
 *         description: Baja no encontrada
 */
router.put("/:id", upload.single("archivo"), updateBaja);

/**
 * @swagger
 * /api/bajas/{id}:
 *   delete:
 *     summary: Elimina una baja
 *     tags: [Bajas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la baja
 *     responses:
 *       200:
 *         description: Baja eliminada exitosamente
 *       404:
 *         description: Baja no encontrada
 */
router.delete("/:id", deleteBaja);

export default router;