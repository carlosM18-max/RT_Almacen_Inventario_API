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
 *         numero_trabajador:
 *           type: integer
 *           description: Número de trabajador del usuario
 *         nombre:  
 *           type: string
 *           description: Nombre del usuario
 *         apellidos:
 *           type: string
 *           description: Apellido del usuario
 *         clave:
 *           type: string
 *           description: Clave del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         RFC:
 *           type: string
 *           description: RFC del usuario
 *         CURP:
 *           type: string
 *           description: CURP del usuario
 *         direcion_pertenencia:
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
 *         cargo:
 *           type: string
 *           enum:
 *              - JEFE DE ÁREA A
 *              - JEFE DE ÁREA B
 *              - JEFE DE DEPARTAMENTO C
 *              - SUBDIRECTOR A
 *              - SUBDIRECTOR DE ÁREA C
 *              - DIRECTOR DE ÁREA B
 *              - DIRECTOR GENERAL A
 *              - DIRECTOR GENERAL B
 *              - SUBSECRETARIO A
 *              - SUBSECRETARIO B
 *           description: Cargo del usuario
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
 *         description: Algú error del servidor
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
 *         schema:
 *           type: integer
 *         required: true
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_trabajador:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               clave:
 *                 type: string
 *               email:
 *                 type: string
 *               RFC:
 *                 type: string
 *               CURP:
 *                 type: string
 *               direcion_pertenencia:
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
 *               cargo:
 *                 type: string
 *                 enum:
 *                   - JEFE DE ÁREA A
 *                   - JEFE DE ÁREA B
 *                   - JEFE DE DEPARTAMENTO C
 *                   - SUBDIRECTOR A
 *                   - SUBDIRECTOR DE ÁREA C
 *                   - DIRECTOR DE ÁREA B
 *                   - DIRECTOR GENERAL A
 *                   - DIRECTOR GENERAL B
 *                   - SUBSECRETARIO A
 *                   - SUBSECRETARIO B
 *     responses:
 *       201:
 *         description: Usuario creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", createUsuario);


/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
  *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               numero_trabajador:
 *                 type: integer
 *               nombre:
 *                 type: string
 *                 format: date
 *               apellidos:
 *                 type: string
 *               clave:
 *                 type: string
 *               email:
 *                 type: string
 *               identificacion:
 *                 type: string
 *               RFC:
 *                 type: string
 *               CURP:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               direcion_pertenencia:
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
 *               cargo:
 *                 type: string
 *                 enum:
 *                   - JEFE DE ÁREA A
 *                   - JEFE DE ÁREA B
 *                   - JEFE DE DEPARTAMENTO C
 *                   - SUBDIRECTOR A
 *                   - SUBDIRECTOR DE ÁREA C
 *                   - DIRECTOR DE ÁREA B
 *                   - DIRECTOR GENERAL A
 *                   - DIRECTOR GENERAL B
 *                   - SUBSECRETARIO A
 *                   - SUBSECRETARIO B
 *     responses:
 *       201:
 *         description: Usuario creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Algún error del servidor
 */
router.put("/:id", updateUsuario);


/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario
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
 *         description: Usuario eliminada exitosamente
 *       404:
 *         description: Uusario no encontrada
 */
router.delete("/:id", deleteUsuario);

export default router;