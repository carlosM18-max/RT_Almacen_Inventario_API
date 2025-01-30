import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Para obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento de archivos generales
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Configuración de almacenamiento de archivos del usuario
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/users"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadUser = multer({ storage: storageUser });

// Configuración de multer para los archivos de entregas
const storageDeliveries = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, '../../public/deliveries');
    // Crea la carpeta si no existe
    fs.mkdirSync(uploadPath, { recursive: true });  
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Sanitiza el nombre del archivo
    const filename = file.originalname.replace(/[^\w\s.-]/g, '_');  
    cb(null, `${Date.now()}-${filename}`); 
  },
});

const uploadDelivery = multer({ storage: storageDeliveries });


export { upload, uploadUser, uploadDelivery };