import { Router } from "express";
import {
  getAllFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
  getFacturaArchivos,
  deleteFacturaArchivo,
  addFacturaArchivo
} from "../controllers/facturasController.js";
import { uploadBills } from "../middlewares/configStorageFile.js";

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
 *         tipo_alta:
 *           type: string
 *           enum: ["Compra (CM)", "Donacion (DN)", "Comodato (CO)"]
 *           description: Tipo de alta
 *         tipo_documento_ampara:
 *           type: string
 *           enum: ["Contrato De Comodato (CO)", "Comprobante Fiscal Digital por Internet (CFDI)"]
 *           description: Tipo de documento que ampara
 *         fecha_adquisicion:
 *           type: string
 *           format: date
 *           description: Fecha de adquisición
 *         numero_de_factura:
 *           type: string
 *           description: Número de factura
 *         tipo_compra:
 *           type: string
 *           enum: ["Presupuesto", "Estatal"]
 *           description: Tipo de compra
 *         concepto:
 *           type: string
 *           description: Concepto
 *         fecha_factura:
 *           type: string
 *           format: date
 *           description: Fecha de la factura
 *         id_proveedor:
 *           type: integer
 *           description: ID del proveedor asociado
 *         cantidad:
 *           type: number
 *           format: float
 *           description: Cantidad
 *         precio_unitario:
 *           type: number
 *           format: float
 *           description: Precio unitario
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
 *               tipo_alta:
 *                 type: string
 *                 enum: [Compra (CM), Donacion (DN), Comodato (CO)]
 *               tipo_documento_ampara:
 *                 type: string
 *                 enum: [Contrato De Comodato (CO), Comprobante Fiscal Digital por Internet (CFDI)]
 *               fecha_adquisicion:
 *                 type: string
 *                 format: date
 *               numero_de_factura:
 *                 type: string
 *               tipo_compra:
 *                 type: string
 *                 enum: [Presupuesto, Estatal]
 *               concepto:
 *                 type: string
 *               fecha_factura:
 *                 type: string
 *                 format: date
 *               id_proveedor:
 *                 type: integer
 *               cantidad:
 *                 type: number
 *               precio_unitario:
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
router.post("/", uploadBills.fields([{ name: 'archivo_pdf', maxCount: 1 }]), createFactura);

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
 *               tipo_alta:
 *                 type: string
 *                 enum: [Compra (CM), Donacion (DN), Comodato (CO)]
 *               tipo_documento_ampara:
 *                 type: string
 *                 enum: [Contrato De Comodato (CO), Comprobante Fiscal Digital por Internet (CFDI)]
 *               fecha_adquisicion:
 *                 type: string
 *                 format: date
 *               numero_de_factura:
 *                 type: string
 *               tipo_compra:
 *                 type: string
 *                 enum: [Presupuesto, Estatal]
 *               concepto:
 *                 type: string
 *               fecha_factura:
 *                 type: string
 *                 format: date
 *               id_proveedor:
 *                 type: integer
 *               cantidad:
 *                 type: number
 *               precio_unitario:
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
router.put("/:id", uploadBills.fields([{ name: 'archivo_pdf', maxCount: 1 }]), updateFactura);


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
 * /api/facturas/{id}/archivos:
 *   get:
 *     summary: Obtener los archivos de una factura
 *     description: Endpoint para obtener la lista de archivos asociados a una factura en específico.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura.
 *     responses:
 *       200:
 *         description: Lista de archivos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del proveedor.
 *                 archivo_pdf:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de rutas de archivos.
 *       404:
 *         description: Factura no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Factura no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los archivos de la factura"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get("/:id/archivos", getFacturaArchivos); // Obtener archivos de un proveedor

/**
 * @swagger
 * /api/facturas/{id}/archivos:
 *   delete:
 *     summary: Eliminar un archivo específico de una factura por nombre
 *     description: Endpoint para eliminar un archivo específico asociado a una factura usando su nombre.
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: Nombre del archivo a eliminar.
 *                 example: "archivo1.png"
 *     responses:
 *       200:
 *         description: Archivo eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Archivo eliminado correctamente"
 *                 archivo_pdf:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista actualizada de rutas de archivos.
 *       404:
 *         description: Factura o archivo no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Archivo no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar el archivo de la factura"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.delete("/:id/archivos/", deleteFacturaArchivo); // Eliminar un archivo específico

/**
 * @swagger
 * /api/facturas/{id}/archivos:
 *   post:
 *     summary: Agregar más archivos a una factura
 *     description: Endpoint para agregar más archivos a una factura existente.
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
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos a agregar.
 *     responses:
 *       200:
 *         description: Archivos agregados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Archivos agregados correctamente"
 *                 archivo_pdf:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista actualizada de rutas de archivos.
 *       404:
 *         description: Proveedor no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Proveedor no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al agregar archivos a la factura"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.post("/:id/archivos", uploadBills.single('archivo_pdf'), addFacturaArchivo); // Agregar más archivos

export default router;
