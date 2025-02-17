import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// FIXME: Configuracion de las rutas de carga de archivos (En proceso).

// Obtener el nombre de archivo y directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de archivos Generales
const storage = multer.diskStorage({
    destination: function (req, _file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de archivo no permitido'), false);
        }
        cb(null, true);
    },
});

// Ruta de archivos de Usuarios
const storageUser = multer.diskStorage({
    destination: function (req, _file, cb) {
        cb(null, path.join(__dirname, "../public/users"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadUser = multer({
    storage: storageUser,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/zip',
            'application/x-zip-compressed',
            'application/x-compressed',
            'application/x-rar-compressed',
            'application/vnd.rar',
            'image/jpeg',
            'image/png'
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de archivo no permitido'), false);
        } else {
            // Mostrar el datos del archivo
            console.log('Archivo subido correctamente', file);
        }
        cb(null, true);
    },
});

// Ruta de archivos de Usuarios de Almacen
const storageAlmacen = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/users/almacen/"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadAlmacen = multer({ storage: storageAlmacen });

// Ruta de archivos de Usuarios de Inventario
const storageInventario = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/users/inventario/"));
    }, filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadInventario = multer({ storage: storageInventario });

// Ruta de archivos de Polizas
const storagePolicy = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/polizas/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadPolicy = multer({ storage: storagePolicy });

// Ruta de archivos de Facturas
const storageBills = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/facturas/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadBills = multer({ storage: storageBills });

// Ruta de archivos de Solicitudes
const storageRequest = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/solicitudes/"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadRequest = multer({ storage: storageRequest });

// Ruta de archivos de Requisiciones
const storageRequisition_proposal = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/propuestaRequisicion/"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadRequisition_proposal = multer({
    storage: storageRequisition_proposal,
});

// Ruta de archivos de Entregas
const storageDeliveries = multer.diskStorage({
    destination: function (req, _file, cb) {
        cb(null, path.join(__dirname, "../public/deliveries"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadDelivery = multer({
    storage: storageDeliveries,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/zip',
            'application/x-zip-compressed',
            'application/x-compressed',
            'application/x-rar-compressed',
            'application/vnd.rar',
            'image/jpeg',
            'image/png'
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de archivo no permitido'), false);
        } else {
            // Mostrar el datos del archivo
            console.log('Archivo subido correctamente', file);
        }
        cb(null, true);
    },
});

export {
    upload,
    uploadUser,
    uploadAlmacen,
    uploadInventario,
    uploadPolicy,
    uploadBills,
    uploadRequest,
    uploadRequisition_proposal,
    uploadDelivery
};
