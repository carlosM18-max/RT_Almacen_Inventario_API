import { Router } from "express";
import {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from "../controllers/usuariosController.js";
import { uploadUser } from "../middlewares/configStorageFile.js";

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
 *         rol:
 *           type: string
 *           enum: [Administrador, Almacenes, Inventario]
 *           description: Rol del usuario
 *         numero_trabajador:
 *           type: integer
 *           description: Número de trabajador del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellidos:
 *           type: string
 *           description: Apellido del usuario
 *         password:
 *           type: string
 *           description: Clave del usuario
 *         confirm_password:
 *           type: string
 *           description: Confirmación de la clave del usuario
 *         departamento:
 *           type: string
 *           description: Departamento del usuario
 *         identificacion:
 *           type: string
 *           format: binary
 *           description: Identificación del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         RFC:
 *           type: string
 *           description: RFC del usuario
 *         CURP:
 *           type: string
 *           description: CURP del usuario
 *         direccion_pertenencia:
 *           type: string
 *           enum:
 *              - DIRECCIÓN GENERAL
 *              - DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN
 *              - DIRECCIÓN DE TELEVISIÓN
 *              - DIRECCIÓN DE NOTICIAS
 *              - DIRECCIÓN DE RADIO
 *              - DIRECCIÓN DE INGENIERIA
 *              - DIRECCIÓN DE PROYECTOS ESTRATEGICOS
 *              - ORGANO INTERNO DE CONTROL
 *              - DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO
 *              - DIRECCIÓN JURIDICA
 *              - DIRECCIÓN DE VINCULACIÓN
 *              - IMAGEN
 *              - ESTACIONES DE RADIO
 *           description: Direccion de pertenencia del usuario
 *         organo_superior:
 *           type: string
 *           description: Organo superior del usuario
 *         area_presupuestal:
 *           type: string
 *           description: Area presupuestal del usuario
 *         fecha_registro:
 *           type: string
 *           format: date
 *           description: Fecha de registro del usuario
 *         imagen:
 *           type: string
 *           format: binary
 *           description: Imagen del usuario
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *     summary: Obtener un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", getUsuarioById);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: string
 *                 enum: [Administrador, Almacenes, Inventario]
 *               numero_trabajador:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *               departamento:
 *                 type: string
 *               identificacion:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *               RFC:
 *                 type: string
 *               CURP:
 *                 type: string
 *               direccion_pertenencia:
 *                 type: string
 *                 enum:
 *                   - DIRECCIÓN GENERAL
 *                   - DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN
 *                   - DIRECCIÓN DE TELEVISIÓN
 *                   - DIRECCIÓN DE NOTICIAS
 *                   - DIRECCIÓN DE RADIO
 *                   - DIRECCIÓN DE INGENIERIA
 *                   - DIRECCIÓN DE PROYECTOS ESTRATEGICOS
 *                   - ORGANO INTERNO DE CONTROL
 *                   - DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO
 *                   - DIRECCIÓN JURIDICA
 *                   - DIRECCIÓN DE VINCULACIÓN
 *                   - IMAGEN
 *                   - ESTACIONES DE RADIO
 *               organo_superior:
 *                 type: string
 *               area_presupuestal:
 *                 type: string
 *               fecha_registro:
 *                type: string
 *                format: date
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", uploadUser.fields([{ name: 'identificacion', maxCount: 10 }, { name: 'imagen', maxCount: 10 }]), createUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: string
 *                 enum: [Administrador, Almacenes, Inventario]
 *               numero_trabajador:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *               departamento:
 *                 type: string
 *               identificacion:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *               RFC:
 *                 type: string
 *               CURP:
 *                 type: string
 *               direccion_pertenencia:
 *                 type: string
 *                 enum:
 *                   - DIRECCIÓN GENERAL
 *                   - DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN
 *                   - DIRECCIÓN DE TELEVISIÓN
 *                   - DIRECCIÓN DE NOTICIAS
 *                   - DIRECCIÓN DE RADIO
 *                   - DIRECCIÓN DE INGENIERIA
 *                   - DIRECCIÓN DE PROYECTOS ESTRATEGICOS
 *                   - ORGANO INTERNO DE CONTROL
 *                   - DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO
 *                   - DIRECCIÓN JURIDICA
 *                   - DIRECCIÓN DE VINCULACIÓN
 *                   - IMAGEN
 *                   - ESTACIONES DE RADIO
 *               organo_superior:
 *                 type: string
 *               area_presupuestal:
 *                 type: string
 *               fecha_registro:
 *                type: string
 *                format: date
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Algún error del servidor
 */
router.put("/:id", uploadUser.fields([{ name: 'identificacion', maxCount: 10 }, { name: 'imagen', maxCount: 10 }]), updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", deleteUsuario);

export default router;
