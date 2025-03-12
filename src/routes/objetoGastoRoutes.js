import { Router } from "express";
import {
    getAllObjetoGastos,
    getObjetoGastoById,
    createObjetoGasto,
    updateObjetoGasto,
    deleteObjetoGasto
} from "../controllers/objetoGastoController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ObjetoGasto:
 *       type: object
 *       required:
 *         - nombre 
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del objeto gasto 
 *         numero_partida:
 *           type: string
 *           description: Numero de partida del objeto gasto
 *         capitulo:
 *           type: string
 *           description: Capitulo del objeto gasto
 *         nombre:
 *           type: string
 *           description: Nombre del objeto gasto
 *         descripcion:
 *           type: string
 *           description: Descripcion del objeto gasto
 */

/**
 * @swagger
 * /api/objetoGastos:
 *   get:
 *     summary: Devuelve la lista de todos los objetos gastos
 *     tags: [ObjetoGasto]
 *     responses:
 *       200:
 *         description: La lista de objetos gastos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ObjetoGasto'
 */
router.get("/", getAllObjetoGastos);

/**
 * @swagger
 * /api/objetoGastos/{id}:
 *   get:
 *     summary: Obtiene un objeto gasto por su ID
 *     tags: [ObjetoGasto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del objeto gasto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del objeto gasto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ObjetoGasto'
 *       404:
 *         description: Objeto gasto no encontrado
 */
router.get("/:id", getObjetoGastoById);

/** 
 * @swagger
 * /api/objetoGastos:
 *   post:
 *     summary: Crea un nuevo objeto gasto
 *     tags: [ObjetoGasto]
 *     requestBody:
 *       required: true
 *       content:   
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_partida:
 *                 type: string
 *               capitulo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Objeto gasto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ObjetoGasto'
 *       500:
 *         description: Error al crear el objeto gasto
 */
router.post("/", createObjetoGasto);

/**
 * @swagger
 * /api/objetoGastos/{id}:
 *   put:
 *     summary: Actualiza un objeto gasto existente
 *     tags: [ObjetoGasto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del objeto gasto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_partida:
 *                 type: string
 *               capitulo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Objeto gasto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:             
 *               $ref: '#/components/schemas/ObjetoGasto'
 *       404:
 *         description: Objeto gasto no encontrado
 *       500:
 *         description: Error al actualizar el objeto gasto
 */
router.put("/:id", updateObjetoGasto);

/**
 * @swagger
 * /api/objetoGastos/{id}:
 *   delete:
 *     summary: Elimina un objeto gasto por su ID
 *     tags: [ObjetoGasto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del objeto gasto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto gasto eliminado exitosamente
 *       404:
 *         description: Objeto gasto no encontrado
 *       500:
 *         description: Error al eliminar el objeto gasto
 */
router.delete("/:id", deleteObjetoGasto);

export default router;