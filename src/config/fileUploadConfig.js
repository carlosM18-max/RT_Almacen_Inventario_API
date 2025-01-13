import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Como se nombraran los archivos
const __filename = fileURLToPath(import.meta.url);
// Ruta del dierectorio actual para guardar archivos
const __dirname = path.dirname(__filename);

// Almacenamiento de archivos generales
const storage = multer.diskStorage({
  // Donde se guardarán los archivos generales
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  // Nombre del archivo
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Almacenamiento de archivos del usuario
const storageUser = multer.diskStorage({
  // Donde se guardarán los archivos del usuario
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/users"));
  },
  // Nombre del archivo
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadUser = multer({ storage: storageUser });

// Almacenamiento de archivos de entregas
const storageDelivery = multer.diskStorage({
  // Donde se guardarán los archivos de las entregas
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/deliveries"));
  },
  // Nombre del archivo
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadDelivery = multer({ storage: storageDelivery });


export { upload, uploadUser, uploadDelivery };