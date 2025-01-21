import express from "express";
import { createAlmacen, getAllAlmacenes, getAlmacenById, updateAlmacen, deleteAlmacen } from "../controllers/almacenesController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Almacen:
 *       type: object
 *       required:
 *         - nombre
 *         - tipo_adquisicion
 *         - descripcion
 *         - tipo
 *         - fecha_entrega
 *         - tipo_activo
 *         - codigo_armonizable
 *         - registro_contable
 *         - cantidad
 *         - locacion
 *         - estado
 *         - numero_serie
 *         - motivo
 *         - tipo_resguardo
 *         - id_articulo
 *         - id_factura
 *         - id_poliza
 *         - orden_entrega
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del almacén
 *         nombre:
 *           type: string
 *         tipo_adquisicion:
 *           type: string
 *           enum: [Donación, Compra, Como dato, Invitación a 3]
 *         descripcion:
 *           type: string
 *         tipo:
 *           type: string
 *           enum: [Insumos, Bien]
 *         fecha_entrega:
 *           type: string
 *           format: date
 *         fecha_salida:
 *           type: string
 *           format: date
 *         tipo_activo:
 *           type: string
 *           enum: [mueble, inmueble]
 *         codigo_armonizable:
 *           type: string
 *         registro_contable:
 *           type: string
 *         cantidad:
 *           type: integer
 *         locacion:
 *           type: string
 *         estado:
 *           type: boolean
 *         numero_serie:
 *           type: string
 *         numero_almacen:
 *           type: string
 *         numero_inventario:
 *           type: string
 *         motivo:
 *           type: string
 *         tipo_resguardo:
 *           type: string
 *           enum: [almacen, inventario]
 *         id_articulo:
 *           type: integer
 *         id_factura:
 *           type: integer
 *         id_poliza:
 *           type: integer
 *         orden_entrega:
 *           type: string
 */

/**
 * @swagger
 * /api/almacenes:
 *   get:
 *     summary: Obtiene todos los almacenes
 *     tags: [Almacenes]
 *     responses:
 *       200:
 *         description: Lista de todos los almacenes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Almacen'
 */
router.get("/", getAllAlmacenes);

/**
 * @swagger
 * /api/almacenes/{id}:
 *   get:
 *     summary: Obtiene un almacén por su ID
 *     tags: [Almacenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del almacén
 *     responses:
 *       200:
 *         description: Detalles del almacén
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Almacen'
 *       404:
 *         description: Almacén no encontrado
 */
router.get("/:id", getAlmacenById);

/**
 * @swagger
 * /api/almacenes:
 *   post:
 *     summary: Crea un nuevo almacén
 *     tags: [Almacenes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo_adquisicion:
 *                 type: string
 *                 enum: [Donación, Compra, Como dato, Invitación a 3]
 *               descripcion:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [Insumos, Bien]
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               fecha_salida:
 *                 type: string
 *                 format: date
 *               tipo_activo:
 *                 type: string
 *                 enum: [mueble, inmueble]
 *               codigo_armonizable:
 *                 type: string
 *               registro_contable:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               locacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 *               numero_serie:
 *                 type: string
 *               numero_almacen:
 *                 type: string
 *               numero_inventario:
 *                 type: string
 *               motivo:
 *                 type: string
 *               tipo_resguardo:
 *                 type: string
 *                 enum: [almacen, inventario]
 *               id_articulo:
 *                 type: integer
 *               id_factura:
 *                 type: integer
 *               id_poliza:
 *                 type: integer
 *               orden_entrega:
 *                 type: string
 *     responses:
 *       201:
 *         description: Almacén creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Almacen'
 */
router.post("/", createAlmacen);

/**
 * @swagger
 * /api/almacenes/{id}:
 *   put:
 *     summary: Actualiza un almacén existente
 *     tags: [Almacenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del almacén
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_adquisicion:
 *                 type: string
 *                 enum: [Donación, Compra, Como dato, Invitación a 3]
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [Insumos, Bien]
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               fecha_salida:
 *                 type: string
 *                 format: date
 *               tipo_activo:
 *                 type: string
 *                 enum: [mueble, inmueble]
 *               codigo_armonizable:
 *                 type: string
 *               registro_contable:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               locacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 *               numero_serie:
 *                 type: string
 *               numero_almacen:
 *                 type: string
 *               numero_inventario:
 *                 type: string
 *               motivo:
 *                 type: string
 *               tipo_resguardo:
 *                 type: string
 *                 enum: [almacen, inventario]
 *               id_articulo:
 *                 type: integer
 *               id_factura:
 *                 type: integer
 *               id_poliza:
 *                 type: integer
 *               orden_entrega:
 *                 type: string
 *     responses:
 *       200:
 *         description: Almacén actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Almacen'
 *       404:
 *         description: Almacén no encontrado
 */
router.put("/:id", updateAlmacen);

/**
 * @swagger
 * /api/almacenes/{id}:
 *   delete:
 *     summary: Elimina un almacén
 *     tags: [Almacenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del almacén
 *     responses:
 *       200:
 *         description: Almacén eliminado exitosamente
 *       404:
 *         description: Almacén no encontrado
 */
router.delete("/:id", deleteAlmacen);

export default router;