import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mime from 'mime-types';
import archiver from 'archiver';

// FIXME:Configuracion del listado de archivos terminada.

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

export const getFileByNameUploads = (req, res) => {
  const { fileName } = req.params;
  const directoryPath = path.join(__dirname, '../public/uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    const matchedFile = files.find(file => path.parse(file).name === fileName);

    if (!matchedFile) {
      return res.status(404).json({
        status: "error",
        message: "File not found",
      });
    }

    const filePath = path.join(directoryPath, matchedFile);
    const mimeType = mime.lookup(matchedFile) || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${matchedFile}"`);
    res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Could not send the file",
          error: err.message,
        });
      }
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

export const getFileByNameDelivery = (req, res) => {
  const { fileName } = req.params;
  const directoryPath = path.join(__dirname, '../public/deliveries');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    const matchedFile = files.find(file => path.parse(file).name === fileName);

    if (!matchedFile) {
      return res.status(404).json({
        status: "error",
        message: "File not found",
      });
    }

    const filePath = path.join(directoryPath, matchedFile);
    const mimeType = mime.lookup(matchedFile) || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${matchedFile}"`);
    res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Could not send the file",
          error: err.message,
        });
      }
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

// Función para obtener un archivo por su nombre
export const getFileByNameUsers = (req, res) => {
  const { fileName } = req.params;
  const directoryPath = path.join(__dirname, '../public/users');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    const matchedFile = files.find(file => path.parse(file).name === fileName);

    if (!matchedFile) {
      return res.status(404).json({
        status: "error",
        message: "File not found",
      });
    }

    const filePath = path.join(directoryPath, matchedFile);
    const mimeType = mime.lookup(matchedFile) || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    // Cambiar a inline para hacerlo .zip
    res.setHeader('Content-Disposition', `inline; filename="${matchedFile}"`);

    res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Could not send the file",
          error: err.message,
        });
      }
    });
  });
};

// Función para obtener múltiples archivos y comprimirlos en un archivo .zip
export const downloadAsZip = (req, res) => {
  const { files } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No file names provided",
    });
  }

  const directoryPath = path.join(__dirname, '../public/users');
  const zipFileName = 'download.zip';

  const archive = archiver('zip', { zlib: { level: 9 } });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);

  archive.pipe(res);

  files.forEach(fileName => {
    const filePath = path.join(directoryPath, fileName);
    console.log("Verificando archivo:", filePath); // <-- Agregar log para depuración
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: fileName });
    } else {
      console.error(`File not found: ${filePath}`);
    }
  });


  archive.finalize();
};

// Listar todos los archivos en el directorio de proveedores
export const listProveedorFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../public/proveedores');

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

// Función para obtener un archivo por su nombre
export const getFileByNameProveedores = (req, res) => {
  const { fileName } = req.params;
  const directoryPath = path.join(__dirname, '../public/proveedores');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    const matchedFile = files.find(file => path.parse(file).name === fileName);

    if (!matchedFile) {
      return res.status(404).json({
        status: "error",
        message: "File not found",
      });
    }

    const filePath = path.join(directoryPath, matchedFile);
    const mimeType = mime.lookup(matchedFile) || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${matchedFile}"`);

    res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Could not send the file",
          error: err.message,
        });
      }
    });
  });
};

// Función para obtener múltiples archivos y comprimirlos en un archivo .zip
export const downloadAsZipProveedores = (req, res) => {
  const { files } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No file names provided",
    });
  }

  const directoryPath = path.join(__dirname, '../public/proveedores');
  const zipFileName = 'download.zip';

  const archive = archiver('zip', { zlib: { level: 9 } });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);

  archive.pipe(res);

  files.forEach(fileName => {
    const filePath = path.join(directoryPath, fileName);
    console.log("Verificando archivo:", filePath); // <-- Agregar log para depuración
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: fileName });
    } else {
      console.error(`File not found: ${filePath}`);
    }
  });


  archive.finalize();
};

// Listar todos los archivos en el directorio de facturas
export const listFacturasFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../public/facturas');

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

// Función para obtener un archivo por su nombre
export const getFileByNameFacturas = (req, res) => {
  const { fileName } = req.params;
  const directoryPath = path.join(__dirname, '../public/facturas');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not list the files",
        error: err.message,
      });
    }

    const matchedFile = files.find(file => path.parse(file).name === fileName);

    if (!matchedFile) {
      return res.status(404).json({
        status: "error",
        message: "File not found",
      });
    }

    const filePath = path.join(directoryPath, matchedFile);
    const mimeType = mime.lookup(matchedFile) || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${matchedFile}"`);

    res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Could not send the file",
          error: err.message,
        });
      }
    });
  });
};