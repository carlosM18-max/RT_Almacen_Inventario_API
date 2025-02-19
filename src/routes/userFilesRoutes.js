import { Router } from 'express';
import { uploadUser } from '../middlewares/configStorageFile.js';
import { listUserFiles, getFileByNameUsers, downloadAsZip } from '../config/fileListConfig.js';
import { uploadPolicy } from '../controllers/uploadController.js';

const router = Router();

// TODO: Ruteos de usuarios terminada

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
router.post('/', uploadUser.single('file'), uploadPolicy);

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

// Ruta para listar archivos de usuarios
router.get('/', listUserFiles);

/**
 * @swagger
 * /api/users/download-zip:
 *   post:
 *     summary: Descarga múltiples archivos como .zip
 *     description: Endpoint para descargar múltiples archivos comprimidos como un archivo .zip
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Archivo .zip descargado correctamente
 *         content:
 *           application/zip:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: No se proporcionaron nombres de archivo
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
 *                   example: "No file names provided"
 *       404:
 *         description: Archivos no encontrados
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
 *                   example: "Could not send the file"
 */

// Nueva ruta para descargar múltiples archivos como .zip
router.post('/download-zip', downloadAsZip);

export default router;
