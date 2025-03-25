import { Router } from "express";
import {
    getAllPersons,
    getPersonbyId,
    createPerson,
    updatePerson,
    deletePerson
} from "../controllers/personasController.js";
import { uploadUser } from "../middlewares/configStorageFile.js";

// TODO: Ruteos de Personas terminado

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Personas:
 *       type: object
 *       required:
 *         - numero_trabajador
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la persona
 *         nombre:
 *           type: string
 *           description: Nombre de la persona
 *         apellidos:
 *           type: string
 *           description: Apellidos de la persona
 *         numero_trabajador:
 *           type: integer
 *           description: Número de trabajador de la persona
 *         email:
 *           type: string
 *           description: Correo electrónico de la persona
 *         departamento:
 *           type: string
 *           description: Departamento al que pertenece la persona
 *         identificacion:
 *           type: string
 *           format: binary
 *           description: Identificación oficial de la persona
 *         RFC:
 *           type: string
 *           description: RFC de la persona
 *         CURP:
 *           type: string
 *           description: CURP de la persona
 *         direccion_pertenencia:
 *           type: string
 *           enum:
 *             - DIRECCIÓN GENERAL
 *             - DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN
 *             - DIRECCIÓN DE TELEVISIÓN
 *             - DIRECCIÓN DE NOTICIAS
 *             - DIRECCIÓN DE RADIO
 *             - DIRECCIÓN DE INGENIERIA
 *             - DIRECCIÓN DE PROYECTOS ESTRATEGICOS
 *             - ORGANO INTERNO DE CONTROL
 *             - DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO
 *             - DIRECCIÓN JURIDICA
 *             - DIRECCIÓN DE VINCULACIÓN
 *             - IMAGEN
 *             - ESTACIONES DE RADIO
 *             - ESTACIONES DE TELEVISIÓN
 *           description: Dirección de pertenencia de la persona
 *         organo_superior:
 *           type: string
 *           description: Órgano superior de la persona
 *         area_presupuestal:
 *           type: string
 *           description: Área presupuestal de la persona
 *         cargo:
 *           type: string
 *           enum:
 *             - Jefe de Area A
 *             - Jefe de Area B
 *             - Jefe de Departamento C
 *             - Subdirector A
 *             - Subdirector de Area C
 *             - Director de Area B
 *             - Director General A
 *             - Director General B
 *             - Subsecretario A
 *             - Secretario В
 *           description: Cargo de la persona
 *         nivel:
 *           type: string
 *           enum:
 *             - 007
 *             - 89A
 *             - 89B
 *             - 09C
 *             - 10A
 *             - 10B
 *             - 10C
 *             - 11A
 *             - 11B
 *             - 11C
 *             - 11S
 *             - 12S
 *             - 12A
 *             - 12B
 *             - 13A
 *             - 13B
 *             - 13S
 *             - 1S3
 *             - 1A3
 *             - 14S
 *             - 14B
 *             - 015
 *           description: Nivel de la persona
 *         fecha_registro:
 *           type: string
 *           format: date
 *           description: Fecha de registro de la persona
 *         imagen:
 *           type: string
 *           format: binary
 *           description: Imagen de la persona
 */

/**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: Obtener todas las personas
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: Lista de personas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personas'
 *       500:
 *         description: Algún error del servidor
 */
router.get("/", getAllPersons);

/**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: Obtener una persona por su ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Datos de la persona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personas'
 *       404:
 *         description: Persona no encontrado
 */
router.get("/:id", getPersonbyId);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Personas]
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
 *               numero_trabajador:
 *                 type: integer
 *               email:
 *                 type: string
 *               departamento:
 *                 type: string
 *               identificacion:
 *                 type: string
 *                 format: binary
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
 *                   - ESTACIONES DE TELEVISIÓN
 *               organo_superior:
 *                 type: string
 *               area_presupuestal:
 *                 type: string
 *               cargo:
 *                 type: string
 *                 enum:
 *                   - Jefe de Area A
 *                   - Jefe de Area B
 *                   - Jefe de Departamento C
 *                   - Subdirector A
 *                   - Subdirector de Area C
 *                   - Director de Area B
 *                   - Director General A
 *                   - Director General B
 *                   - Subsecretario A
 *                   - Secretario B
 *               nivel:
 *                 type: string
 *                 enum:
 *                   - 007
 *                   - 89A
 *                   - 89B
 *                   - 09C
 *                   - 10A
 *                   - 10B
 *                   - 10C
 *                   - 11A
 *                   - 11B
 *                   - 11C
 *                   - 11S
 *                   - 12S
 *                   - 12A
 *                   - 12B
 *                   - 13A
 *                   - 13B
 *                   - 13S
 *                   - 1S3
 *                   - 1A3
 *                   - 14S
 *                   - 14B
 *                   - 015
 *               fecha_registro:
 *                 type: string
 *                 format: date
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personas'
 *       500:
 *         description: Algún error del servidor
 */
router.post("/", uploadUser.fields([{ name: 'identificacion', maxCount: 1 }, { name: 'imagen', maxCount: 1 }]), createPerson);

/**
 * @swagger
 * /api/personas/{id}:
 *   put:
 *     summary: Actualizar una persona existente
 *     tags: [Personas]
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
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               numero_trabajador:
 *                 type: integer
 *               email:
 *                 type: string
 *               departamento:
 *                 type: string
 *               identificacion:
 *                 type: string
 *                 format: binary
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
 *                   - ESTACIONES DE TELEVISIÓN
 *               organo_superior:
 *                 type: string
 *               area_presupuestal:
 *                 type: string
 *               cargo:
 *                 type: string
 *                 enum:
 *                   - Jefe de Area A
 *                   - Jefe de Area B
 *                   - Jefe de Departamento C
 *                   - Subdirector A
 *                   - Subdirector de Area C
 *                   - Director de Area B
 *                   - Director General A
 *                   - Director General B
 *                   - Subsecretario A
 *                   - Secretario B
 *               nivel:
 *                 type: string
 *                 enum:
 *                   - 007
 *                   - 89A
 *                   - 89B
 *                   - 09C
 *                   - 10A
 *                   - 10B
 *                   - 10C
 *                   - 11A
 *                   - 11B
 *                   - 11C
 *                   - 11S
 *                   - 12S
 *                   - 12A
 *                   - 12B
 *                   - 13A
 *                   - 13B
 *                   - 13S
 *                   - 1S3
 *                   - 1A3
 *                   - 14S
 *                   - 14B
 *                   - 015
 *               fecha_registro:
 *                 type: string
 *                 format: date
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Persona actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personas'
 *       500:
 *         description: Algún error del servidor
 */
router.put("/:id", uploadUser.fields([{ name: 'identificacion', maxCount: 1 }, { name: 'imagen', maxCount: 1 }]), updatePerson);

/**
 * @swagger
 * /api/personas/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona eliminado exitosamente
 *       404:
 *         description: Persona no encontrado
 */
router.delete("/:id", deletePerson);

export default router;
