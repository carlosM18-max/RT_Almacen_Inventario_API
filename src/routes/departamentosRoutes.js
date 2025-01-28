import express from "express";
import { getAllDepartamentos, getDepartamentoById, createDepartamento, updateDepartamento, deleteDepartamento } from "../controllers/departamentosController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Departamento:     
 *       type: object
 *       required:
 *         - nombre
 *         - abreviatura
 *         - estado 
 *         - id_area
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del departamento
 *         nombre:
 *           type: string         
 *           description: Nombre del departamento
 *         abreviatura:
 *           type: string
 *           description: Abreviatura del departamento   
 *         estado:
 *           type: integer
 *           description: Estado del departamento (activo/inactivo)
 *         id_area:
 *           type: integer
 *           description: ID de la area a la que pertenece el departamento
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Devuelve la lista de todos los departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: La lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departamento'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getAllDepartamentos);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   get:
 *     summary: Obtiene un departamento por su ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Detalles del departamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", getDepartamentoById);

/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     summary: Crea un nuevo departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               abreviatura:
 *                 type: string
 *               estado:
 *                 type: boolean
 *               id_area:
 *                 type: integer
 *     responses:   
 *       201:
 *         description: Departamento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", createDepartamento);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   put:
 *     summary: Actualiza un departamento existente
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer         
 *         required: true
 *         description: ID del departamento
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               abreviatura:
 *                 type: string
 *               estado:
 *                 type: boolean
 *               id_area:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Departamento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id", updateDepartamento);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   delete:
 *     summary: Elimina un departamento
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento eliminado exitosamente
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", deleteDepartamento);

export default router;