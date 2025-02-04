import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Para obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento de archivos generales
const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Configuración de almacenamiento de archivos del usuario
const storageUser = multer.diskStorage({
  destination: function (req, _file, cb) {
    cb(null, path.join(__dirname, "../public/users"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadUser = multer({ storage: storageUser });

// Configuración de multer para los archivos de entregas
const storageDeliveries = multer.diskStorage({

  destination: function (req, _file, cb) {
    cb(null, path.join(__dirname, "../public/deliveries"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadDelivery = multer({ storage: storageDeliveries });


export { upload, uploadUser, uploadDelivery };