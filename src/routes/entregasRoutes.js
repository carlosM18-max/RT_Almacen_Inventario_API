import { Router } from "express";
import {
  getAllEntregas,
  getEntregaById,
  createEntrega,
  updateEntrega,
  deleteEntrega,
} from "../controllers/entregasController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Entrega:
 *       type: object
 *       required:
 *         - cantidad
 *         - fecha_entrega
 *         - descripcion
 *         - estado
 *         - observaciones
 *         - fotos_entrada
 *         - tipo
 *         - id_articulos
 *         - id_usuario_entrega
 *         - id_usuario_recibe
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la entrega
 *         cantidad:
 *           type: integer
 *           description: Cantidad de artículos entregados
 *         fecha_entrega:
 *           type: string
 *           format: date
 *           description: Fecha de la entrega
 *         descripcion:
 *           type: string
 *           description: Descripción de la entrega
 *         estado:
 *           type: string
 *           enum: [Proceso, Entregado, Cancelado, Pendiente de envio, Bajo resguardo, No entregado, Devuelto]
 *           description: Estado de la entrega
 *         observaciones:
 *           type: string
 *           description: Observaciones sobre la entrega
 *         fotos_entrada:
 *           type: string
 *           format: binary
 *           description: Fotos de entrada de la entrega
 *         tipo:
 *           type: string
 *           enum: [externo, interno]
 *           description: Tipo de entrega
 *         ubicacion:
 *           type: string
 *           description: Ubicación de la entrega
 *         id_almacen:
 *           type: integer
 *           description: ID del almacén asociado
 *         id_inventario:
 *           type: integer
 *           description: ID del inventario asociado
 *         id_articulos:
 *           type: integer
 *           description: ID del artículo entregado
 *         id_usuario_entrega:
 *           type: integer
 *           description: ID del usuario que realiza la entrega
 *         id_usuario_recibe:
 *           type: integer
 *           description: ID del usuario que recibe la entrega
 */

/**
 * @swagger
 * /api/entregas:
 *   get:
 *     summary: Obtiene la lista de todas las entregas
 *     tags: [Entregas]
 *     responses:
 *       200:
 *         description: Lista de entregas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrega'
 */
router.get("/", getAllEntregas);

/**
 * @swagger
 * /api/entregas/{id}:
 *   get:
 *     summary: Obtiene una entrega por su ID
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrega
 *     responses:
 *       200:
 *         description: Datos de la entrega
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrega'
 *       404:
 *         description: Entrega no encontrada
 */
router.get("/:id", getEntregaById);

/**
 * @swagger
 * /api/entregas:
 *   post:
 *     summary: Crea una nueva entrega
 *     tags: [Entregas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Proceso, Entregado, Cancelado, Pendiente de envio, Bajo resguardo, No entregado, Devuelto]
 *               observaciones:
 *                 type: string
 *               fotos_entrada:
 *                 type: string
 *                 format: binary
 *               tipo:
 *                 type: string
 *                 enum: [externo, interno]
 *               ubicacion:
 *                 type: string
 *               id_almacen:
 *                 type: integer
 *               id_inventario:
 *                 type: integer
 *               id_articulos:
 *                 type: integer
 *               id_usuario_entrega:
 *                 type: integer
 *               id_usuario_recibe:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Entrega creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrega'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", createEntrega);

/**
 * @swagger
 * /api/entregas/{id}:
 *   put:
 *     summary: Actualiza una entrega existente
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrega
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Proceso, Entregado, Cancelado, Pendiente de envio, Bajo resguardo, No entregado, Devuelto]
 *               observaciones:
 *                 type: string
 *               fotos_entrada:
 *                 type: string
 *                 format: binary
 *               tipo:
 *                 type: string
 *                 enum: [externo, interno]
 *               ubicacion:
 *                 type: string
 *               id_almacen:
 *                 type: integer
 *               id_inventario:
 *                 type: integer
 *               id_articulos:
 *                 type: integer
 *               id_usuario_entrega:
 *                 type: integer
 *               id_usuario_recibe:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Entrega actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrega'
 *       404:
 *         description: Entrega no encontrada
 */
router.put("/:id", updateEntrega);

/**
 * @swagger
 * /api/entregas/{id}:
 *   delete:
 *     summary: Elimina una entrega
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrega
 *     responses:
 *       200:
 *         description: Entrega eliminada exitosamente
 *       404:
 *         description: Entrega no encontrada
 */
router.delete("/:id", deleteEntrega);

export default router;