import { Router } from 'express';
import { uploadUser as fileUserUploadConfig } from '../config/fileUploadConfig.js';
import { listUserFiles } from '../config/fileListConfig.js';
import { uploadPolicy } from '../controllers/uploadController.js';

const router = Router();


/**
 * @swagger
 * /api/users-upload:
 *   post:
 *     summary: Sube un archivo de usuario
 *     description: Endpoint para subir un archivo de usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       201:
 *         description: Archivo subido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *       400:
 *         description: No se subió ningún archivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "bad request"
 *                 message:
 *                   type: string
 *                   example: "No file uploaded"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "server unavailable"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

// Ruta para subir archivos de entregas
router.post('/', fileUserUploadConfig.single('file'), uploadPolicy);

/**
 * @swagger
 * /api/users-files:
 *   get:
 *     summary: Lista todos los archivos de usuarios subidos
 *     description: Endpoint para listar todos los archivos de usuarios subidos
 *     tags:
 *       - Users
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

// Ruta para listar archivos de entregas
router.get('/', listUserFiles);

export default router;