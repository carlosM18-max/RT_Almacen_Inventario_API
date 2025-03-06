import Facturas from "../models/tb_Facturas.js";
import Proveedores from "../models/tb_Provedores.js";
import path from "path";

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
      tipo_alta,
      tipo_documento_ampara,
      fecha_adquisicion,
      numero_de_factura,
      tipo_compra,
      concepto,
      fecha_factura,
      id_proveedor,
      cantidad,
      precio_unitario,
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
    console.log(req.body);
    console.log(req.files);

    const newFactura = await Facturas.create({
      tipo_alta,
      tipo_documento_ampara,
      fecha_adquisicion,
      numero_de_factura,
      tipo_compra,
      concepto,
      fecha_factura,
      id_proveedor,
      cantidad,
      precio_unitario,
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