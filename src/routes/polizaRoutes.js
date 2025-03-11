import { Router } from "express";
import {
  getAllPolizas,
  getPolizaById,
  createPoliza,
  updatePoliza,
  deletePoliza,
  getAllData,
  updatedPolizaArchivo
} from "../controllers/polizaController.js";
import { uploadPolicies } from "../middlewares/configStorageFile.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Poliza:
 *       type: object
 *       required:
 *         - tipo
 *         - cantidad
 *         - deducible
 *         - prima
 *         - clausulas_exclusion
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
 *         cantidad:
 *           type: number
 *           format: decimal
 *           description: Cantidad asociada a la póliza
 *         calidad:
 *           type: string
 *           description: Calidad del bien asegurado
 *         deducible:
 *           type: number
 *           format: decimal
 *           description: Deducible de la póliza
 *         limites_indemnizacion:
 *           type: string
 *           description: Límites de indemnización
 *         periodo_vigencia:
 *           type: string
 *           format: date
 *           description: Periodo de vigencia de la póliza
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de emisión de la póliza
 *         archivo:
 *           type: string
 *           format: binary
 *           description: Archivo adjunto de la póliza
 *         prima:
 *           type: number
 *           format: decimal
 *           description: Prima de la póliza
 *         clausulas_exclusion:
 *           type: string
 *           description: Cláusulas de exclusión
 */

/**
 * @swagger
 * /api/polizas:
 *   get:
 *     summary: Obtiene la lista de todas las pólizas
 *     tags: [Polizas]
 *     responses:
 *       200:
 *         description: Lista de todas las pólizas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Polizas'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getAllPolizas);

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
 *               $ref: '#/components/schemas/Polizas'
 *       404:
 *         description: No se encontró la póliza
 */
router.get("/:id", getPolizaById);

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
 *               cantidad:
 *                 type: number
 *                 format: decimal
 *               calidad:
 *                 type: string
 *               deducible:
 *                 type: number
 *                 format: decimal
 *               limites_indemnizacion:
 *                 type: string
 *               periodo_vigencia:
 *                 type: string
 *                 format: date
 *               fecha:
 *                 type: string
 *                 format: date
 *               archivo:
 *                 type: string
 *                 format: binary
 *               prima:
 *                 type: number
 *                 format: decimal
 *               clausulas_exclusion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Póliza creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Polizas'
 *       500:
 *         description: Error del servidor
 */
router.post("/", uploadPolicies.fields([{ name: 'archivo', maxCount: 1 }]), createPoliza);

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
 *               cantidad:
 *                 type: number
 *                 format: decimal
 *               calidad:
 *                 type: string
 *               deducible:
 *                 type: number
 *                 format: decimal
 *               limites_indemnizacion:
 *                 type: string
 *               periodo_vigencia:
 *                 type: string
 *                 format: date
 *               fecha:
 *                 type: string
 *                 format: date
 *               archivo:
 *                 type: string
 *                 format: binary
 *               prima:
 *                 type: number
 *                 format: decimal
 *               clausulas_exclusion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Póliza actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Polizas'
 *       404:
 *         description: Póliza no encontrada
 */
router.put("/:id", uploadPolicies.fields([{ name: 'archivo', maxCount: 1 }]), updatePoliza);

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
 *     summary: Devuelve todos los datos (Pólizas y Facturas)
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
 *                     $ref: '#/components/schemas/Polizas'
 *                 Facturas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Facturas'
 *       500:
 *         description: Algún error del servidor
 */
router.get("/all-data", getAllData);

/**
 * @swagger
 * /api/polizas/{id}/reemplazar-archivo:
 *   put:
 *     summary: Reemplazar el archivo de una poliza
 *     description: Endpoint para reemplazar el archivo de una poliza existente. Elimina el archivo anterior y sube uno nuevo.
 *     tags:
 *       - Polizas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la poliza.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivo:
 *                 type: string
 *                 format: binary
 *                 description: Nuevo archivo PDF para reemplazar el existente.
 *     responses:
 *       200:
 *         description: Archivo reemplazado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Archivo reemplazado exitosamente"
 *                 nuevoArchivo:
 *                   type: string
 *                   description: Ruta del nuevo archivo.
 *       400:
 *         description: No se subió ningún archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se subió ningún archivo"
 *       404:
 *         description: Poliza no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Poliza no encontrada"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al reemplazar el archivo de la poliza"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.put("/:id/reemplazar-archivo", uploadPolicies.single('archivo'), updatedPolizaArchivo);

export default router;