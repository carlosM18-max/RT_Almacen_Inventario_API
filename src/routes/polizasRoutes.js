import { Router } from "express"
import {
  createPolitica,
  getAllPoliticas,
  getPoliticaById,
  getAllData,
} from "../controllers/polizasController.js"

const router = Router()

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
 *               prima:
 *                 type: number
 *               deducible:
 *                 type: number
 *               limites_indemnizacion:
 *                 type: string
 *               periodo_vigencia:
 *                 type: string
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
 *               $ref: '#/components/schemas/Politica'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", createPolitica)

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
 *                 $ref: '#/components/schemas/Politica'
 */
router.get("/", getAllPoliticas)

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
 *               $ref: '#/components/schemas/Politica'
 *       404:
 *         description: No se encontró la póliza
 */
router.get("/:id", getPoliticaById)

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
 *                     $ref: '#/components/schemas/Politica'
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
router.get("/all-data", getAllData)

export default router