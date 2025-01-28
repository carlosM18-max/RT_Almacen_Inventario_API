import { Router } from "express";
import {
  createPoliza,
  getAllPoliza,
  getPolizaById,
  updatePoliza,
  deletePoliza,
  getAllData,
} from "../controllers/polizasController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Poliza:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la póliza
 *         descripcion:
 *           type: string
 *           description: Descripción de la póliza
 *         cobertura:
 *           type: string
 *           description: Tipo de cobertura
 *         tipo:
 *           type: string
 *           enum: [Egresos, Presupuestales, Donaciones, Cheques, Ingresos, Transferencias, Retenciones, Depositos]
 *           description: Tipo de póliza
 *         prima:
 *           type: number
 *           description: Prima de la póliza
 *         deducible:
 *           type: number
 *           description: Deducible de la póliza
 *         limites_indemnizacion:
 *           type: string
 *           description: Límites de indemnización
 *         periodo_vigencia:
 *           type: string
 *           format: date
 *           description: Periodo de vigencia de la póliza
 *         clausulas_exclusion:
 *           type: string
 *           description: Cláusulas de exclusión
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de emisión de la póliza
 *         cantidad:
 *           type: number
 *           description: Cantidad asociada a la póliza
 *         archivo:
 *           type: string
 *           format: binary
 *           description: Archivo adjunto de la póliza
 *     Factura:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la factura
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la factura
 *         monto:
 *           type: number
 *           description: Monto total de la factura
 *         descripcion:
 *           type: string
 *           description: Descripción de la factura
 */

/**
 * @swagger
 * /api/polizas:
 *   get:
 *     summary: Devuelve la lista de todas las pólizas
 *     tags: [Polizas]
 *     responses:
 *       200:
 *         description: La lista de pólizas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poliza'
 */
router.get("/", getAllPoliza);

/**
 * @swagger
 * /api/polizas:
 *   post:
 *     summary: Crea una nueva póliza
 *     tags: [Polizas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               cobertura:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [Egresos, Presupuestales, Donaciones, Cheques, Ingresos, Transferencias, Retenciones, Depositos]
 *               prima:
 *                 type: number
 *               deducible:
 *                 type: number
 *               limites_indemnizacion:
 *                 type: string
 *               periodo_vigencia:
 *                 type: string
 *                 format: date
 *               clausulas_exclusion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               cantidad:
 *                 type: number
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: La póliza se creó exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", createPoliza);

/**
 * @swagger
 * /api/polizas/{id}:
 *   get:
 *     summary: Obtiene una póliza por su ID
 *     tags: [Polizas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la póliza
 *     responses:
 *       200:
 *         description: La descripción de la póliza por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 *       404:
 *         description: No se encontró la póliza
 */
router.get("/:id", getPolizaById);

/**
 * @swagger
 * /api/polizas/{id}:
 *   put:
 *     summary: Actualiza una póliza existente
 *     tags: [Polizas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la póliza
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               cobertura:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [Egresos, Presupuestales, Donaciones, Cheques, Ingresos, Transferencias, Retenciones, Depositos]
 *               prima:
 *                 type: number
 *               deducible:
 *                 type: number
 *               limites_indemnizacion:
 *                 type: string
 *               periodo_vigencia:
 *                 type: string
 *                 format: date
 *               clausulas_exclusion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               cantidad:
 *                 type: number
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Póliza actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 *       404:
 *         description: Póliza no encontrada
 */
router.put("/:id", updatePoliza);

/**
 * @swagger
 * /api/polizas/{id}:
 *   delete:
 *     summary: Elimina una póliza
 *     tags: [Polizas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la póliza
 *     responses:
 *       200:
 *         description: Póliza eliminada exitosamente
 *       404:
 *         description: Póliza no encontrada
 */
router.delete("/:id", deletePoliza);

/**
 * @swagger
 * /api/all-data:
 *   get:
 *     summary: Devuelve todos los datos (pólizas, facturas y vida útil)
 *     tags: [TodosLosDatos]
 *     responses:
 *       200:
 *         description: Todos los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Polizas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Poliza'
 *                 facturas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Factura'
 *                 vidaUtil:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Algún error del servidor
 */
router.get("/all-data", getAllData);

export default router;