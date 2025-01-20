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
    // Define el destino de los archivos de usuarios subidos
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/users/"));
    },
    // Define el nombre del archivo de usuario subido
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de usuarios
const uploadUser = multer({ storage: storageUser });

// Configuración de almacenamiento para archivos de políticas
const storagePolicy = multer.diskStorage({
    // Define el destino de los archivos de políticas subidos
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/politicas/"));
    },
    // Define el nombre del archivo de políticas subido
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de políticas
const uploadPolicy = multer({ storage: storagePolicy });

// Configuración de almacenamiento para archivos de facturas
const storageBills = multer.diskStorage({
    // Define el destino de los archivos de facturas subidos
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/facturas/"));
    },
    // Define el nombre del archivo de factura subido
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de facturas
const uploadBills = multer({ storage: storageBills });

const storageRequest = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/soliictudes/"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadRequest = multer({ storage: storageRequest });

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

// Exporta los middlewares de multer configurados
export {
    upload, uploadUser, uploadBills, uploadPolicy, uploadRequest, uploadRequisition_proposal
};