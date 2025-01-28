import { Router } from "express";
import {
  getAllArticulos,
  getArticuloById,
  createArticulo,
  updateArticulo,
  deleteArticulo,
} from "../controllers/articulosController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Articulo:
 *       type: object
 *       required:
 *         - nombre
 *         - marca
 *         - modelo
 *         - estado
 *         - descripcion
 *         - caracteristicas
 *         - QR
 *         - id_de_poliza
 *         - id_de_la_factura
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del artículo
 *         nombre:
 *           type: string
 *           description: Nombre del artículo
 *         marca:
 *           type: string
 *           description: Marca del artículo
 *         modelo:
 *           type: string
 *           description: Modelo del artículo
 *         fecha_de_adquisicion:
 *           type: string
 *           description: Fecha de adquisición del artículo
 *         numero_de_serie:
 *           type: string
 *           description: Número de serie del artículo
 *         estado:
 *           type: string
 *           enum: [Reparacion, En uso, Baja, Descompuesto, Perdido, No disponible]
 *           description: Estado del artículo
 *         descripcion:
 *           type: string
 *           description: Descripción del artículo
 *         caracteristicas:
 *           type: string
 *           description: Características del artículo
 *         tipo:
 *           type: string
 *           enum: [Insumos, Bien]
 *           description: Tipo de artículo
 *         QR:
 *           type: string
 *           description: Código QR del artículo
 *         fotos_entrada:
 *           type: string
 *           description: Fotos de entrada del artículo
 *         id_de_vida_util:
 *           type: integer
 *           description: ID de vida útil del artículo
 *         id_de_poliza:
 *           type: integer
 *           description: ID de póliza del artículo
 *         id_de_la_factura:
 *           type: integer
 *           description: ID de la factura del artículo
 */

/**
 * @swagger
 * /api/articulos:
 *   get:
 *     summary: Obtiene la lista de todos los artículos
 *     tags: [Articulos]
 *     responses:
 *       200:
 *         description: Lista de artículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articulo'
 */
router.get("/", getAllArticulos);

/**
 * @swagger
 * /api/articulos/{id}:
 *   get:
 *     summary: Obtiene un artículo por su ID
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Datos del artículo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       404:
 *         description: Artículo no encontrado
 */
router.get("/:id", getArticuloById);

/**
 * @swagger
 * /api/articulos:
 *   post:
 *     summary: Crea un nuevo artículo
 *     tags: [Articulos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               fecha_de_adquisicion:
 *                 type: string
 *               numero_de_serie:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Reparacion, En uso, Baja, Descompuesto, Perdido, No disponible]
 *               descripcion:
 *                 type: string
 *               caracteristicas:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [Insumos, Bien]
 *               QR:
 *                 type: string
 *               fotos_entrada:
 *                 type: string
 *                 format: binary
 *               id_de_vida_util:
 *                 type: integer
 *               id_de_poliza:
 *                 type: integer
 *               id_de_la_factura:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Artículo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       400:
 *         description: Error en la creación del artículo
 */
router.post("/", createArticulo);

/**
 * @swagger
 * /api/articulos/{id}:
 *   put:
 *     summary: Actualiza un artículo por su ID
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del artículo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               fecha_de_adquisicion:
 *                 type: string
 *               numero_de_serie:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Reparacion, En uso, Baja, Descompuesto, Perdido, No disponible]
 *               descripcion:
 *                 type: string
 *               caracteristicas:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [Insumos, Bien]
 *               QR:
 *                 type: string
 *               fotos_entrada:
 *                 type: string
 *                 format: binary
 *               id_de_vida_util:
 *                 type: integer
 *               id_de_poliza:
 *                 type: integer
 *               id_de_la_factura:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Artículo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       404:
 *         description: Artículo no encontrado
 *       400:
 *         description: Error en la actualización del artículo
 */
router.put("/:id", updateArticulo);

/**
 * @swagger
 * /api/articulos/{id}:
 *   delete:
 *     summary: Elimina un artículo por su ID
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Artículo eliminado exitosamente
 *       404:
 *         description: Artículo no encontrado
 *       500:
 *         description: Error en la eliminación del artículo
 */
router.delete("/:id", deleteArticulo);

export default router;