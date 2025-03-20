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

    // Verificar si se subieron archivos
    if (!req.files || (!req.files.archivo_pdf && !req.files.contrato_compra)) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    // Manejo del archivo PDF de la factura
    if (req.files.archivo_pdf) {
      let archivosActuales = factura.archivo_pdf ? factura.archivo_pdf.split(';') : [];

      // Eliminar archivos anteriores
      archivosActuales.forEach(archivo => {
        if (fs.existsSync(archivo)) {
          fs.unlinkSync(archivo);
        }
      });

      // Guardar nuevo archivo
      const nuevoArchivoPDF = req.files.archivo_pdf.map(file => file.path);
      await factura.update({ archivo_pdf: nuevoArchivoPDF.join(';') });
    }

    // Manejo del contrato ampara
    if (req.files.contrato_compra) {
      let contratosActuales = factura.contrato_compra ? factura.contrato_compra.split(';') : [];

      // Eliminar archivos anteriores
      contratosActuales.forEach(archivo => {
        if (fs.existsSync(archivo)) {
          fs.unlinkSync(archivo);
        }
      });

      // Guardar nuevo archivo
      const nuevoContratoCompra = req.files.contrato_compra.map(file => file.path);
      await factura.update({ contrato_compra: nuevoContratoCompra.join(';') });
    }

    res.json({
      message: "Archivos reemplazados exitosamente",
      nuevoArchivoPDF: req.files.archivo_pdf ? req.files.archivo_pdf.map(file => file.path) : null,
      nuevoContratoCompra: req.files.contrato_compra ? req.files.contrato_compra.map(file => file.path) : null
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al reemplazar los archivos de la factura",
      error: error.message,
    });
  }
};