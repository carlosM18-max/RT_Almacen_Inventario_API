import multer from "multer";
import path from "path";

// Ruta de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/uploads/");
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
        cb(null, "src/public/users/");
    },
    // Define el nombre del archivo de usuario subido
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de usuarios
const uploadUser = multer({ storage: storageUser });

// Configuración de almacenamiento para archivos de usuarios
const storagePolicy = multer.diskStorage({
    // Define el destino de los archivos de usuarios subidos
    destination: function (req, file, cb) {
        cb(null, "src/public/policy/");
    },
    // Define el nombre del archivo de usuario subido
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de usuarios
const uploadPolicy = multer({ storage: storagePolicy });

// Configuración de almacenamiento para archivos de usuarios
const storageBills = multer.diskStorage({
    // Define el destino de los archivos de usuarios subidos
    destination: function (req, file, cb) {
        cb(null, "src/public/bills/");
    },
    // Define el nombre del archivo de usuario subido
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuración de multer para archivos de usuarios
const uploadBills = multer({ storage: storageBills });

const storageRequest = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/request/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadRequest = multer({ storage: storageRequest });

const storageRequisition_proposal = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/requisitionProposal/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadRequisition_proposal = multer({
    storage: storageRequisition_proposal,
});

// Exporta los middlewares de multer configurados
export {upload, uploadUser, uploadBills, uploadPolicy, uploadRequest, uploadRequisition_proposal};