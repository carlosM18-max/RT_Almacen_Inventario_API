import { Router } from "express";
import {
    getAllArticulos,
    getArticulosById,
    createArticulo,
    updateArticulo,
    deleteArticulo,
    deleteArticuloArchivo,
    addArticuloArchivo
} from "../controllers/articulosController.js";
import { uploadArticulos } from "../middlewares/configStorageFile.js";

// TODO: Ruteos de Articulos terminada

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Articulos:
 *       type: object
 *       required:
 *         - numero_factura
 *         - id_objetogasto
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del artículo
 *         numero_factura:
 *           type: string
 *           description: Número de factura
 *         id_objetogasto:
 *           type: integer
 *           description: ID del objeto de gasto
 *         nombre:
 *           type: string
 *           description: Nombre del artículo
 *         importe_sin_iva:
 *           type: number
 *           description: Importe sin IVA
 *         iva:
 *           type: number
 *           description: IVA aplicado
 *         importe_con_iva:
 *           type: number
 *           description: Importe total con IVA
 *         cantidad:
 *           type: number
 *           description: Cantidad adquirida
 *         unidad_medida:
 *           type: string
 *           enum:
 *              - Piezas
 *              - Paquetes
 *              - Cajas
 *              - Kilogramos
 *              - Litros
 *              - Metros
 *              - Rollos
 *              - Bultos
 *           description: Unidad de medida
 *         total_ingreso:
 *           type: integer
 *           description: Total de ingreso
 *         foto_articulo:
 *           type: string
 *           format: binary
 *           description: Imágenes del artículo
 */

/**
 * @swagger
 * /api/articulos:
 *   get:
 *     summary: Obtener todos los artículos
 *     tags: [Articulos]
 *     responses:
 *       200:
 *         description: Lista de artículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articulos'
 *       500:
 *         description: Algún error del servidor
 */
router.get("/", getAllArticulos);

/**
 * @swagger
 * /api/articulos/{id}:
 *   get:
 *     summary: Obtener un artículo por ID
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Datos del artículo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulos'
 *       404:
 *         description: Artículo no encontrado
 */
router.get("/:id", getArticulosById);

/**
 * @swagger
 * /api/articulos:
 *   post:
 *     summary: Crear un nuevo artículo
 *     tags: [Articulos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               numero_factura:
 *                 type: string
 *               id_objetogasto:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               importe_sin_iva:
 *                 type: number
 *               iva:
 *                 type: number
 *               importe_con_iva:
 *                 type: number
 *               cantidad:
 *                 type: number
 *               unidad_medida:
 *                 type: string
 *                 enum:
 *                     - Piezas
 *                     - Paquetes
 *                     - Cajas
 *                     - Kilogramos
 *                     - Litros
 *                     - Metros
 *                     - Rollos
 *                     - Bultos
 *               total_ingreso:
 *                  type: integer
 *               foto_articulo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Artículo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulos'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", uploadArticulos.fields([{ name: 'foto_articulo', maxCount: 10 }]), createArticulo);

/**
 * @swagger
 * /api/articulos/{id}:
 *   put:
 *     summary: Actualizar un artículo existente
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               importe_sin_iva:
 *                 type: number
 *               iva:
 *                 type: number
 *               importe_con_iva:
 *                 type: number
 *               cantidad:
 *                 type: number
 *                 enum:
 *                     - Piezas
 *                     - Paquetes
 *                     - Cajas
 *                     - Kilogramos
 *                     - Litros
 *                     - Metros
 *                     - Rollos
 *                     - Bultos
 *               total_ingreso:
 *                  type: integer
 *               unidad_medida:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artículo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulos'
 *       500:
 *         description: Algún error del servidor
 */
router.put("/:id", uploadArticulos.fields([{ name: 'foto_articulo', maxCount: 10 }]), updateArticulo);

/**
 * @swagger
 * /api/articulos/{id}:
 *   delete:
 *     summary: Eliminar un artículo
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Artículo eliminado exitosamente
 *       404:
 *         description: Artículo no encontrado
 */
router.delete("/:id", deleteArticulo);

/**
 * @swagger
 * /api/articulos/{id}/archivo:
 *   delete:
 *     summary: Eliminar un archivo específico de un artículo
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artículo
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
 *                 foto_articulo:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista actualizada de rutas de archivos.
 *       404:
 *         description: Articulo no encontrado.
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
 *                   example: "Error al eliminar el archivo del articulo"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.delete("/:id/archivo", deleteArticuloArchivo);

/**
 * @swagger
 * /api/articulos/{id}/archivo:
 *   post:
 *     summary: Agregar archivos a un artículo
 *     description: Endpoint para agregar más archivos a un artículo existente.
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artículo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto_articulo:
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
 *                 foto_articulo:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista actualizada de rutas de archivos.
 *       404:
 *         description: Articulo no encontrado.
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
 *                   example: "Error al agregar archivos al articulo"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.post("/:id/archivo", uploadArticulos.fields([{ name: 'foto_articulo', maxCount: 10 }]), addArticuloArchivo);

export default router;
