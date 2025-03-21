import { Router } from "express";
import {
  getAllFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
  updatedFacturaArchivo,
  updatedFacturaArchivoContrato
} from "../controllers/facturasController.js";
import { uploadBills } from "../middlewares/configStorageFile.js";

// TODO: Ruteos de Facturas terminado

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       required:
 *         - numero_de_factura
 *         - concepto
 *         - id_proveedor
 *         - cantidad
 *         - precio_unitario
 *         - sub_total
 *         - iva
 *         - total
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la factura
 *         tipo_compra:
 *           type: string
 *           enum: ["Directa", "Licitacion", "Invitacion"]
 *           description: Tipo de alta
 *         contrato_compra:
 *           type: string
 *           format: binary
 *           description: Archivo PDF de la factura
 *         fecha_adquisicion:
 *           type: string
 *           format: date
 *           description: Fecha de adquisición
 *         numero_de_factura:
 *           type: string
 *           description: Número de factura
 *         tipo_presupuesto:
 *           type: string
 *           enum: ["Ingresos Propios", "Recurso Estatal"]
 *           description: Tipo de alta
 *         id_proveedor:
 *           type: integer
 *           description: ID del proveedor asociado
 *         cantidad:
 *           type: number
 *           format: float
 *           description: Cantidad
 *         sub_total:
 *           type: number
 *           format: float
 *           description: Subtotal
 *         iva:
 *           type: number
 *           format: float
 *           description: IVA
 *         total:
 *           type: number
 *           format: float
 *           description: Total
 *         archivo_pdf:
 *           type: string
 *           format: binary
 *           description: Archivo PDF de la factura
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
 *                 $ref: '#/components/schemas/Facturas'
 */
router.get("/", getAllFacturas);

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
 *               $ref: '#/components/schemas/Facturas'
 *       404:
 *         description: No se encontró la factura
 */
router.get("/:id", getFacturaById);

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
 *               tipo_compra:
 *                 type: string
 *                 enum: [Directa, Licitacion, Invitacion]
 *               contrato_compra:
 *                 type: string
 *                 format: binary
 *               fecha_adquisicion:
 *                 type: string
 *                 format: date
 *               numero_de_factura:
 *                 type: string
 *               tipo_presupuesto:
 *                 type: string
 *                 enum: [Ingresos Propios, Recurso Estatal]
 *               id_proveedor:
 *                 type: integer
 *               cantidad:
 *                 type: number
 *               sub_total:
 *                 type: number
 *               iva:
 *                 type: number
 *               total:
 *                 type: number
 *               archivo_pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: La factura se creó exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facturas'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", uploadBills.fields([{ name: 'archivo_pdf', maxCount: 1 }, { name: 'contrato_compra', maxCount: 1 }]), createFactura);

/**
 * @swagger
 * /api/facturas/{id}:
 *   put:
 *     summary: Actualiza la factura por su ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_compra:
 *                 type: string
 *                 enum: [Directa, Licitacion, Invitacion]
 *               contrato_compra:
 *                 type: string
 *                 format: binary
 *               fecha_adquisicion:
 *                 type: string
 *                 format: date
 *               numero_de_factura:
 *                 type: string
 *               tipo_presupuesto:
 *                 type: string
 *                 enum: [Ingresos Propios, Recurso Estatal]
 *               id_proveedor:
 *                 type: integer
 *               cantidad:
 *                 type: number
 *               sub_total:
 *                 type: number
 *               iva:
 *                 type: number
 *               total:
 *                 type: number
 *               archivo_pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: La factura fue actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facturas'
 *       404:
 *         description: No se encontró la factura
 *       500:
 *         description: Ocurrió algún error en el servidor
 */
router.put("/:id", uploadBills.fields([{ name: 'archivo_pdf', maxCount: 1 }, { name: 'contrato_compra', maxCount: 1 }]), updateFactura);


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
router.delete("/:id", deleteFactura);

/**
 * @swagger
 * /api/facturas/{id}/reemplazar-pdf:
 *   put:
  *     summary: Reemplazar el archivo pdf de la factura
  *     description: Endpoint para reemplazar el archivo pdf de una factura existente. Elimina el archivo anterior y sube uno nuevo.
  *     tags:
  *       - Facturas
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         description: ID de la factura.
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               archivo_pdf:
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
  *         description: Factura no encontrada.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: "Factura no encontrada"
  *       500:
  *         description: Error en el servidor.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: "Error al reemplazar el archivo de la factura"
  *                 error:
  *                   type: string
  *                   example: "Error message"
  */
router.put("/:id/reemplazar-pdf", uploadBills.single('archivo_pdf'), updatedFacturaArchivo);

/**
 * @swagger
 * /api/facturas/{id}/reemplazar-contrato:
 *   put:
  *     summary: Reemplazar el archivo de contrato de la factura
  *     description: Endpoint para reemplazar el archivo de contrato de una factura existente. Elimina el archivo anterior y sube uno nuevo.
  *     tags:
  *       - Facturas
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         description: ID de la factura.
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               contrato_compra:
  *                 type: string
  *                 format: binary
  *                 description: Nuevo archivo de contrato para reemplazar el existente.
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
  *                 nuevoArchivoContrato:
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
  *         description: Factura no encontrada.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: "Factura no encontrada"
  *       500:
  *         description: Error en el servidor.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: "Error al reemplazar el archivo de la factura"
  *                 error:
  *                   type: string
  *                   example: "Error message"
  */
router.put("/:id/reemplazar-contrato", uploadBills.single('contrato_compra'), updatedFacturaArchivoContrato);

export default router;

