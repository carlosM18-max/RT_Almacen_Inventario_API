import { Router } from "express";
import {
    getAllProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
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

export default router;