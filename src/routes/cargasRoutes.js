import { Router } from "express";
import {
  getAllCargas,
  getCargaById,
  createCarga,
  updateCarga,
  deleteCarga,
} from "../controllers/cargasController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Carga:
 *       type: object
 *       required:
 *         - nombre
 *         - estado
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado de la carga
 *         nombre:
 *           type: string
 *           description: Nombre de la carga
 *         estado:
 *           type: integer
 *           description: Estado de la carga (activo/inactivo)
 */

/**
 * @swagger
 * /api/cargas:
 *   get:
 *     summary: Obtiene la lista de todas las cargas
 *     tags: [Cargas]
 *     responses:
 *       200:
 *         description: Lista de cargas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carga'
 */
router.get("/", getAllCargas);

/**
 * @swagger
 * /api/cargas/{id}:
 *   get:
 *     summary: Obtiene una carga por su ID
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carga
 *     responses:
 *       200:
 *         description: Datos de la carga
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carga'
 *       404:
 *         description: Carga no encontrada
 */
router.get("/:id", getCargaById);

/**
 * @swagger
 * /api/cargas:
 *   post:
 *     summary: Crea una nueva carga
 *     tags: [Cargas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estado:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Carga creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carga'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", createCarga);

/**
 * @swagger
 * /api/cargas/{id}:
 *   put:
 *     summary: Actualiza una carga existente
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Carga actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carga'
 *       404:
 *         description: Carga no encontrada
 */
router.put("/:id", updateCarga);

/**
 * @swagger
 * /api/cargas/{id}:
 *   delete:
 *     summary: Elimina una carga
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carga
 *     responses:
 *       200:
 *         description: Carga eliminada exitosamente
 *       404:
 *         description: Carga no encontrada
 */
router.delete("/:id", deleteCarga);

export default router;