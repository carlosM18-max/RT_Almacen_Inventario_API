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
 *         - estado_bien
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la baja
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la baja
 *         estado_bien:
 *           type: string
 *           enum: [Nuevo, Bueno, Regular, Malo, Inservible]
 *           description: Estado de la baja
 *         ampara_baja:
 *           type: string
 *           format: binary
 *           description: Archivo de la ampara
 *         solicitud_dictamen:
 *           type: string
 *           format: binary
 *           description: Archivo del dictamen de la solicitud
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
 *               fecha:
 *                  type: string
 *                  format: date
 *               estado_bien:
 *                  type: string
 *                  enum: [Nuevo, Bueno, Regular, Malo, Inservible]
 *               ampara_baja:
 *                  type: string
 *                  format: binary
 *               solicitud_dictamen:
 *                  type: string
 *                  format: binary
 *               id_inventario:
 *                  type: integer
 *               id_usuario:
 *                  type: integer
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
 *               fecha:
 *                  type: string
 *                  format: date
 *               estado_bien:
 *                  type: string
 *                  enum: [Nuevo, Bueno, Regular, Malo, Inservible]
 *               ampara_baja:
 *                  type: string
 *                  format: binary
 *               solicitud_dictamen:
 *                  type: string
 *                  format: binary
 *               id_inventario:
 *                  type: integer
 *               id_usuario:
 *                  type: integer
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