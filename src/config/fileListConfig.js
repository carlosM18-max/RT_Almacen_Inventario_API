import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// TODO:Configuracion del listado de archivos terminada.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Listar todos los archivos en el directorio de uploads
export const listFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../public/uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    res.status(200).json({
      status: "success",
      files: files
    });
  });
};

// Listar todos los archivos en el directorio de entregas
export const listDeliveryFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../public/deliveries');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    res.status(200).json({
      status: "success",
      files: files
    });
  });
};

// Listar todos los archivos en el directorio de usuarios
export const listUserFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../public/users');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    res.status(200).json({
      status: "success",
      files: files
    });
  });
};