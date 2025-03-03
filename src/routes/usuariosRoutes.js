import { Router } from "express";
import {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from "../controllers/usuariosController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       required:
 *         - numero_trabajador
 *         - clave
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del usuario
 *         id_persona:
 *           type: integer
 *           description: ID de la persona asociada al usuario
 *         rol:
 *           type: string
 *           enum: [Administrador, Almacenes, Inventario, Usuario]
 *           description: Rol del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 */

/**
 * @swagger
 * /api/usuarios/:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios con datos de la persona asociada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Algún error del servidor
 */
router.get("/", getAllUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario con la persona asociada
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", getUsuarioById);

/**
 * @swagger
 * /api/usuarios/:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_persona
 *             properties:
 *               id_persona:
 *                 type: integer
 *                 description: ID de la persona asociada
 *               rol:
 *                 type: string
 *                 enum: ["Administrador", "Inventario", "Almacenes", "Usuario"]
 *                 description: Rol del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error al crear el usuario
 */
router.post("/", createUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_persona:
 *                 type: integer
 *                 description: Nuevo ID de la persona asociada
 *               rol:
 *                 type: string
 *                 enum: ["Administrador", "Inventario", "Almacenes", "Usuario"]
 *                 description: Nuevo rol del usuario
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error al actualizar el usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:id", updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", deleteUsuario);

export default router;
