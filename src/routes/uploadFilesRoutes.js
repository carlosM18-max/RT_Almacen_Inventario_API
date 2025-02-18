import { Router } from 'express';
import { upload } from '../middlewares/configStorageFile.js'; 
import { listFiles, getFileByNameUploads } from '../config/fileListConfig.js';
import { uploadPolicy } from '../controllers/uploadController.js';

const router = Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Sube un archivo de póliza
 *     description: Endpoint para subir un archivo de póliza
 *     tags:
 *       - Upload
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

// Ruta para subir archivos (pólizas)
router.post('/', upload.single('file'), uploadPolicy);

/**
 * @swagger
 * /api/upload-files:
 *   get:
 *     summary: Lista todos los archivos subidos
 *     description: Endpoint para listar todos los archivos subidos
 *     tags:
 *       - Upload
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

// Ruta para listar todos los archivos
router.get('/', listFiles);

/**
 * @swagger
 * /api/upload-files/{fileName}:
 *   get:
 *     summary: Obtiene un archivo específico por su nombre
 *     description: Endpoint para obtener un archivo específico por su nombre
 *     tags:
 *       - Upload
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
router.get('/:fileName', getFileByNameUploads);

export default router;
