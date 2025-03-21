import Facturas from "../models/tb_Facturas.js";
import Proveedores from "../models/tb_Proveedores.js";
import path from "path";
import fs from "fs";

// TODO: Controlador de Facturas terminado

export const getAllFacturas = async (req, res) => {
  try {
    const proveedores = await Facturas.findAll();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener proveedores",
      error: error.message,
    });
  }
};

export const getFacturaById = async (req, res) => {
  try {
    const factura = await Facturas.findByPk(req.params.id);
    if (factura) {
      res.json(factura);
    } else {
      res.status(404).json({ message: "Factura no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la factura",
      error: error.message,
    });
  }
};

export const createFactura = async (req, res) => {
  try {
    const {
      tipo_compra,
      fecha_adquisicion,
      numero_de_factura,
      tipo_presupuesto,
      id_proveedor,
      cantidad,
      sub_total,
      iva,
      total
    } = req.body;

    // Verificar si un proveedor existe
    const proveedor = await Proveedores.findByPk(id_proveedor);
    if (!proveedor) {
      return res.status(400).json({ message: "El proveedor no existe" });
    }

    // Obtener las rutas de los archivos
    const archivo_pdf = req.files ? req.files.archivo_pdf.map(file => file.path) : [];
    const contrato_compra = req.files ? req.files.contrato_compra.map(file => file.path) : [];
    console.log(req.body);
    console.log(req.files);

    const newFactura = await Facturas.create({
      tipo_compra,
      contrato_compra: contrato_compra.join(';'),
      fecha_adquisicion,
      numero_de_factura,
      tipo_presupuesto,
      id_proveedor,
      cantidad,
      sub_total,
      iva,
      total,
      archivo_pdf: archivo_pdf.join(';'),
    });

    res.status(201).json(newFactura);
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el proveedor",
      error: error.message,
    });
  }
};

export const updateFactura = async (req, res) => {
  try {
    const updated = await Facturas.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated[0] === 1) {
      const updatedFactura = await Facturas.findByPk(req.params.id);
      res.json(updatedFactura);
    } else {
      res.status(404).json({ message: "Factura no encontrada" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar la factura",
      error: error.message,
    });
  }
};

export const deleteFactura = async (req, res) => {
  try {
    const deleted = await Facturas.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Factura eliminada exitosamente" });
    } else {
      res.status(404).json({ message: "Factura no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la factura",
      error: error.message,
    });
  }
};

export const updatedFacturaArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la factura por su ID
    const factura = await Facturas.findByPk(id);

    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    // Verificar si se subió un nuevo archivo
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    // Obtener la lista actual de archivos
    let archivosActuales = factura.archivo_pdf ? factura.archivo_pdf.split(';') : [];

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

    // Actualizar la factura con la nueva lista de archivos
    await factura.update({ archivo_pdf: archivosActuales.join(';') });

    res.json({
      message: "Archivo reemplazado exitosamente",
      nuevoArchivo
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al reemplazar el archivo de la factura",
      error: error.message,
    });
  }
};

export const updatedFacturaArchivoContrato = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la factura por su ID
    const factura = await Facturas.findByPk(id);

    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    // Verificar si se subió un nuevo archivo
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    // Obtener la lista actual de archivos
    let archivosActuales = factura.contrato_compra ? factura.contrato_compra.split(';') : [];

    // Eliminar el archivo anterior del sistema de archivos
    archivosActuales.forEach(archivo => {
      if (fs.existsSync(archivo)) {
        fs.unlinkSync(archivo); // Eliminar el archivo
      }
    });

    // Obtener la ruta del nuevo archivo
    const nuevoArchivoContrato = req.file.path;

    // Actualizar la lista de archivos con el nuevo archivo
    archivosActuales = [nuevoArchivoContrato];

    // Actualizar la factura con la nueva lista de archivos
    await factura.update({ contrato_compra: archivosActuales.join(';') });

    res.json({
      message: "Archivo reemplazado exitosamente",
      nuevoArchivoContrato
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al reemplazar el archivo de la factura",
      error: error.message,
    });
  }
};