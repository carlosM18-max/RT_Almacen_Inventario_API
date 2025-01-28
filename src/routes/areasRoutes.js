import { Router } from "express";
import {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} from "../controllers/areasController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       required:
 *         - nombre
 *         - estado
 *         - abreviatura
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del área
 *         nombre:
 *           type: string
 *           description: Nombre del área
 *         estado:
 *           type: boolean
 *           description: Estado del área (activo/inactivo)
 *         abreviatura:
 *           type: string
 *           description: Abreviatura del área
 */

/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Obtiene todas las áreas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: Lista de todas las áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 */
router.get("/", getAllAreas);

/**
 * @swagger
 * /api/areas/{id}:
 *   get:
 *     summary: Obtiene un área por su ID
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Detalles del área
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       404:
 *         description: Área no encontrada
 */
router.get("/:id", getAreaById);

/**
 * @swagger
 * /api/areas:
 *   post:
 *     summary: Crea una nueva área
 *     tags: [Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estado:
 *                 type: boolean
 *               abreviatura:
 *                 type: string
 *     responses:
 *       201:
 *         description: Área creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", createArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   put:
 *     summary: Actualiza un área existente
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estado:
 *                 type: boolean
 *               abreviatura:
 *                 type: string
 *     responses:
 *       200:
 *         description: Área actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       404:
 *         description: Área no encontrada
 */
router.put("/:id", updateArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     summary: Elimina un área
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Área eliminada exitosamente
 *       404:
 *         description: Área no encontrada
 */
router.delete("/:id", deleteArea);

export default router;
