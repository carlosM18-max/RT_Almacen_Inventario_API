import { Router } from "express"
import {
  getAllFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
} from "../controllers/facturasController.js"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       required:
 *         - numero_de_factura
 *         - tipo_compra
 *         - concepto
 *         - fecha_factura
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la factura
 *         numero_de_factura:
 *           type: string
 *           description: El número de la factura
 *         tipo_compra:
 *           type: string
 *           description: El tipo de compra
 *         concepto:
 *           type: string
 *           description: El concepto de la factura
 *         iva:
 *           type: number
 *           description: El monto del IVA
 *         fecha_factura:
 *           type: string
 *           format: date
 *           description: La fecha de la factura
 *         nombre_proveedor:
 *           type: string
 *           description: El nombre del proveedor
 *         cantidad:
 *           type: number
 *           description: La cantidad
 *         precio_unitario:
 *           type: number
 *           description: El precio unitario
 *         sub_total:
 *           type: number
 *           description: El subtotal
 *         total:
 *           type: number
 *           description: El monto total
 *         telefono_proveedor:
 *           type: string
 *           description: El número de teléfono del proveedor
 *         RFC_proveedor:
 *           type: string
 *           description: El RFC del proveedor
 *         direccion_proveedor:
 *           type: string
 *           description: La dirección del proveedor
 *     Politica:
 *       type: object
 *       required:
 *         - descripcion
 *         - cobertura
 *         - tipo
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la póliza
 *         descripcion:
 *           type: string
 *           description: La descripción de la póliza
 *         cobertura:
 *           type: string
 *           description: La cobertura de la póliza
 *         tipo:
 *           type: string
 *           description: El tipo de póliza
 *         prima:
 *           type: number
 *           description: La prima de la póliza
 *         deducible:
 *           type: number
 *           description: El deducible de la póliza
 *         limites_indemnizacion:
 *           type: string
 *           description: Los límites de indemnización
 *         periodo_vigencia:
 *           type: string
 *           description: El período de vigencia
 *         clausulas_exclusion:
 *           type: string
 *           description: Las cláusulas de exclusión
 *         fecha:
 *           type: string
 *           format: date
 *           description: La fecha de la póliza
 *         cantidad:
 *           type: number
 *           description: La cantidad
 */

/**
 * @swagger
 * /api/facturas:
 *   get:
 *     summary: Devuelve la lista de todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: La lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 */
router.get("/", getAllFacturas)

/**
 * @swagger
 * /api/facturas/{id}:
 *   get:
 *     summary: Obtiene una factura por su ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura
 *     responses:
 *       200:
 *         description: La descripción de la factura por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: No se encontró la factura
 */
router.get("/:id", getFacturaById)

/**
 * @swagger
 * /api/facturas:
 *   post:
 *     summary: Crea una nueva factura
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               numero_de_factura:
 *                 type: string
 *               tipo_compra:
 *                 type: string
 *               concepto:
 *                 type: string
 *               iva:
 *                 type: number
 *               fecha_factura:
 *                 type: string
 *                 format: date
 *               nombre_proveedor:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               precio_unitario:
 *                 type: number
 *               sub_total:
 *                 type: number
 *               total:
 *                 type: number
 *               telefono_proveedor:
 *                 type: string
 *               RFC_proveedor:
 *                 type: string
 *               direccion_proveedor:
 *                 type: string
 *               archivo_pdf:
 *                 type: string
 *                 format: binary
 *               archivo_sat:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: La factura se creó exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", createFactura)

/**
 * @swagger
 * /api/facturas/{id}:
 *  put:
 *    summary: Actualiza la factura por su ID
 *    tags: [Facturas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: El ID de la factura
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Factura'
 *    responses:
 *      200:
 *        description: La factura fue actualizada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Factura'
 *      404:
 *        description: No se encontró la factura
 *      500:
 *        description: Ocurrió algún error
 */
router.put("/:id", updateFactura)

/**
 * @swagger
 * /api/facturas/{id}:
 *   delete:
 *     summary: Elimina la factura por su ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura
 *     responses:
 *       200:
 *         description: La factura fue eliminada
 *       404:
 *         description: No se encontró la factura
 */
router.delete("/:id", deleteFactura)

export default router