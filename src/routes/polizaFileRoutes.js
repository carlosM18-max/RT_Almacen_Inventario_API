import { Router } from "express";
import { listPolizasFiles, getFileByNamePolizas } from "../middlewares/fileListConfig.js";

// TODO: Ruteo de archivos de polizas terminado

const router = Router();

/**
 * @swagger
 * /api/polizas-files:
 *   get:
 *     summary: Lista todos los archivos de polizas subidos
 *     description: Endpoint para listar todos los archivos de polizas subidos
 *     tags:
 *       - Polizas
 *     responses:
 *       200:
 *         description: Lista de archivos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Could not list the files"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

// Ruta para listar archivos de proveedores
router.get('/', listPolizasFiles);

/**
 * @swagger
 * /api/polizas-files/{fileName}:
 *   get:
 *     summary: Obtiene un archivo específico por su nombre
 *     description: Endpoint para obtener un archivo específico por su nombre
 *     tags:
 *       - Polizas
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre del archivo a obtener
 *     responses:
 *       200:
 *         description: Archivo obtenido correctamente
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Archivo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "File not found"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Could not retrieve the file"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
// Nueva ruta para obtener un archivo por su nombre
router.get('/:fileName', getFileByNamePolizas);

export default router;