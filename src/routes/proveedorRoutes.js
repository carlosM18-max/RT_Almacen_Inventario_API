import { Router } from "express";
import {
    getAllProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor,
    getProveedorArchivos,
    deleteProveedorArchivo,
    addProveedorArchivos
} from "../controllers/proveedoresController.js";
import { uploadProveedores } from "../middlewares/configStorageFile.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Proveedores:
 *       type: object
 *       required:
 *         - tipo_proveedor
 *         - cuenta_bancaria
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del proveedor
 *         nombre:
 *           type: string
 *           description: Nombre del proveedor
 *         apellidos:
 *           type: string
 *           description: Apellido del proveedor
 *         tipo_proveedor:
 *           type: string
 *           enum:
 *              - Fisico
 *              - Moral
 *           description: Tipo de proveedor
 *         RFC:
 *           type: string
 *           description: RFC del proveedor
 *         direccion:
 *           type: string
 *           description: Dirección del proveedor
 *         telefono:
 *           type: string
 *           description: Teléfono del proveedor
 *         email:
 *           type: string
 *           description: Correo electrónico del proveedor
 *         cuenta_bancaria:
 *           type: string
 *           description: Cuenta bancaria del proveedor
 *         archivos:
 *           type: string
 *           format: binary
 *           description: Archivos del proveedor
 */

/**
 * @swagger
 * /api/proveedor:
 *   get:
 *     summary: Obtener todos los Proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de Proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proveedores'
 *       500:
 *         description: Algún error del servidor
 */
router.get("/", getAllProveedores);

/**
 * @swagger
 * /api/proveedor/{id}:
 *   get:
 *     summary: Obtener un proveedor por su ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Datos del proveedor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedores'
 *       404:
 *         description: Proveedores no encontrado
 */
router.get("/:id", getProveedorById);

/**
 * @swagger
 * /api/proveedor:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipo_proveedor:
 *                 type: string
 *                 enum:
 *                   - Fisico
 *                   - Moral
 *               RFC:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               cuenta_bancaria:
 *                 type: string
 *               archivos:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedores'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", uploadProveedores.fields([{ name: 'archivos', maxCount: 10 }]), createProveedor);

/**
 * @swagger
 * /api/proveedor/{id}:
 *   put:
 *     summary: Actualizar un proveedor existente
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipo_proveedor:
 *                 type: string
 *                 enum:
 *                   - Fisico
 *                   - Moral
 *               RFC:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               cuenta_bancaria:
 *                 type: string
 *               archivos:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Proveedor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedores'
 *       500:
 *         description: Algún error del servidor
 */
router.put("/:id", uploadProveedores.fields([{ name: 'archivos', maxCount: 10 }]), updateProveedor);

/**
 * @swagger
 * /api/proveedor/{id}:
 *   delete:
 *     summary: Eliminar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete("/:id", deleteProveedor);

/**
 * @swagger
 * /api/proveedor/{id}/archivos:
 *   get:
 *     summary: Obtener los archivos de un proveedor
 *     description: Endpoint para obtener la lista de archivos asociados a un proveedor específico.
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor.
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
 *                 archivos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de rutas de archivos.
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
 *                   example: "Error al obtener los archivos del proveedor"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get("/:id/archivos", getProveedorArchivos); // Obtener archivos de un proveedor

/**
 * @swagger
 * /api/proveedor/{id}/archivos:
 *   delete:
 *     summary: Eliminar un archivo específico de un proveedor por nombre
 *     description: Endpoint para eliminar un archivo específico asociado a un proveedor usando su nombre.
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor.
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
 *                 archivos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista actualizada de rutas de archivos.
 *       404:
 *         description: Proveedor o archivo no encontrado.
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
 *                   example: "Error al eliminar el archivo del proveedor"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.delete("/:id/archivos", deleteProveedorArchivo); // Eliminar un archivo específico
/**
 * @swagger
 * /api/proveedor/{id}/archivos:
 *   post:
 *     summary: Agregar más archivos a un proveedor
 *     description: Endpoint para agregar más archivos a un proveedor existente.
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivos:
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
 *                 archivos:
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
 *                   example: "Error al agregar archivos al proveedor"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.post("/:id/archivos", uploadProveedores.fields([{ name: 'archivos', maxCount: 10 }]), addProveedorArchivos); // Agregar más archivos
export default router;