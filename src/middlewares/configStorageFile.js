import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Obtener el nombre de archivo y directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Configuración de almacenamiento para archivos de usuarios
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/users/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de almacenamiento para archivos de almacen 
const storageAlmacen = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/users/almacen/"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Configuración de multer para archivos de almacen 
const uploadAlmacen = multer({ storage: storageAlmacen });

// Configuración de almacenamiento para archivos de inventario 
const storageInventario = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/users/inventario/"));
    }, filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Configuración de multer para archivos de inventario 
const uploadInventario = multer({ storage: storageInventario });

// Configuración de multer para archivos de usuarios
const uploadUser = multer({ storage: storageUser });

// Configuración de almacenamiento para archivos de políticas
const storagePolicy = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/polizas/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de políticas
const uploadPolicy = multer({ storage: storagePolicy });

// Configuración de almacenamiento para archivos de facturas
const storageBills = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/facturas/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de facturas
const uploadBills = multer({ storage: storageBills });

// Configuracion de almacenamiento para archivos de solicitudes
const storageRequest = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/solicitudes/"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Configuracion de multer para archivos de solicitudes
const uploadRequest = multer({ storage: storageRequest });

// Configuracion de almacenamiento para archivos de propuestas de requisiciones
const storageRequisition_proposal = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/propuestaRequisicion/"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Configuracion de multer para archivos de propuestas de requisiciones
const uploadRequisition_proposal = multer({
    storage: storageRequisition_proposal,
});

// Exporta los middlewares de multer configurados
export {
    upload, uploadUser, uploadBills, uploadPolicy, uploadRequest, uploadRequisition_proposal, uploadAlmacen, uploadInventario
};
