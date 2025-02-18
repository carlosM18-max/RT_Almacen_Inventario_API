import { Router } from 'express';
import { uploadDelivery } from '../middlewares/configStorageFile.js';
import { listDeliveryFiles, getFileByNameDelivery } from '../config/fileListConfig.js';
import { uploadPolicy } from '../controllers/uploadController.js';

const router = Router();

// TODO: Ruteos de entregas terminada

/**
 * @swagger
 * /api/deliveries-upload:
 *   post:
 *     summary: Sube un archivo de entrega
 *     description: Endpoint para subir un archivo de entrega
 *     tags:
 *       - Deliveries
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Tipos de archivos permitidos:
 *                   - .PDF (`application/pdf`)
 *                   - .ZIP (`application/zip`, `application/x-zip-compressed`, `application/x-compressed`)
 *                   - .RAR (`application/x-rar-compressed`, `application/vnd.rar`, `application/x-compressed`)
 *                   - .IMG (`image/jpeg`, `image/png`, `image/jpg`)
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
router.post('/', uploadDelivery.single('file'), uploadPolicy);


/**
 * @swagger
 * /api/deliveries-files:
 *   get:
 *     summary: Lista todos los archivos de entregas subidos
 *     description: Endpoint para listar todos los archivos de entregas subidos
 *     tags:
 *       - Deliveries
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
router.get('/', listDeliveryFiles);

/**
 * @swagger
 * /api/deliveries-files/{fileName}:
 *   get:
 *     summary: Obtiene un archivo específico por su nombre
 *     description: Endpoint para obtener un archivo específico por su nombre
 *     tags:
 *       - Deliveries
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
router.get('/:fileName', getFileByNameDelivery);

export default router;
