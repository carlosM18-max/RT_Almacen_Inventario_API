import Poliza from "../models/tb_Poliza.js";
import Facturas from "../models/tb_Facturas.js";
import path from "path";
import fs from "fs";

// TODO: Controlador de Polizas terminado

export const getAllPolizas = async (req, res) => {
  try {
    const polizas = await Poliza.findAll();
    res.json(polizas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las polizas",
      error: error.message,
    });
  }
};

export const getPolizaById = async (req, res) => {
  try {
    const poliza = await Poliza.findByPk(req.params.id);
    if (poliza) {
      res.json(poliza);
    } else {
      res.status(404).json({ message: "Poliza no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las polizas",
      error: error.message,
    });
  }
};

export const createPoliza =  async (req, res) => {
  try {
    const {
      numero_poliza,
      descripcion,
      tipo,
      fecha,
    } = req.body;

    // Obtener las rutas de los archivos
    const archivo = req.files ? req.files.archivo.map(file => file.path) : [];
    console.log(req.body);
    console.log(req.files);

    const newPoliza =  await Poliza.create({
      numero_poliza,
      descripcion,
      tipo,
      fecha,
      archivo: archivo.join(';'),
    });

    res.status(201).json(newPoliza);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la poliza",
      error: error.message,
    });
  }
};

export const updatePoliza = async (req, res) => {
  try {
    const poliza = await Poliza.findByPk(req.params.id);

    if (!poliza) {
      return res.status(404).json({ message: "Poliza no encontrada" });
    }

    const {
      numero_poliza,
      descripcion,
      tipo,
      fecha,
    } = req.body;

    let archivos = poliza.archivo;
    let archivosAntiguos = archivos ? archivos.split(';') : [];

    if (req.files && req.files.archivo) {
      // Si hay nuevos archivos, actualizamos la ruta
      archivos = req.files.archivo.map(file => file.path).join(';');

      // Eliminamos los archivos antiguos
      archivosAntiguos.forEach(filePath => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await poliza.update({
      numero_poliza,
      descripcion,
      tipo,
      fecha,
      archivo: archivos,
    });

    res.json({ message: "Poliza actualizada exitosamente", poliza });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar la poliza",
      error: error.message,
    });
  }
};


export const deletePoliza = async (req, res) => {
  try {
    const deleted = await Poliza.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Poliza eliminada exitosamente" });
    } else {
      res.status(404).json({ message: "Poliza no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la poliza",
      error: error.message,
    });
  }
};

export const getAllData = async (req, res) => {
  try {
    const [polizas, facturas] = await Promise.all([
      Poliza.findAll(),
      Facturas.findAll(),
    ]);

    res.json({ polizas, facturas });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
}

export const updatedPolizaArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la poliza por su ID
    const poliza = await Poliza.findByPk(id);

    if (!poliza) {
      return res.status(404).json({ message: "Poliza no encontrada" });
    }

    // Verificar si se subio un nuevo archivo
    if (!req.file) {
      return res.status(400).json({ message: "No se subio ningun archivo" });
    }

    // Obtener la lista actual de archivos
    let archivosActuales = poliza.archivo ? poliza.archivo.split(';') : [];

    // Eliminar el archivo anterior del sistema de archivos
    archivosActuales.forEach(archivo => {
      if (fs.existsSync(archivo)) {
        fs.unlinkSync(archivo); // Eliminar el archivo
      }
    });

    // Obtener la ruta del nuevo archivo
    const nuevoArchivo = req.file.path;

    // Actualizar la lista de archivos con el nuevo archivo
    archivosActuales = [nuevoArchivo];

    // Actualizar la BD con los nuevos archivos
    await poliza.update({ archivo: archivosActuales.join(';') });

    res.json({
      message: "Archivo actualizado correctamente",
      nuevoArchivo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el archivo",
      error: error.message,
    })
  }
}