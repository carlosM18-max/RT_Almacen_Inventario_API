import Facturas from "../models/tb_Facturas.js"
import { uploadBills } from "../middlewares/configStorageFile.js"

export const getAllFacturas = async (req, res) => {
  try {
    const facturas = await Facturas.findAll()
    res.json({ data: facturas })
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}

export const getFacturaById = async (req, res) => {
  try {
    const factura = await Facturas.findByPk(req.params.id)
    if (factura) {
      res.json({ data: factura })
    } else {
      res.status(404).json({ status: "not found", message: "Factura no encontrada" })
    }
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}

export const createFactura = (req, res) => {
  uploadBills.fields([
    { name: "archivo_pdf", maxCount: 1 },
    { name: "archivo_sat", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    try {
      const { files, body } = req;

      // Validación del numero_de_factura
      if (isNaN(body.numero_de_factura) || body.numero_de_factura.length > 10) {
        return res.status(400).json({ status: "error", message: "Número de factura inválido" });
      }

      const factura = await Facturas.create({
        ...body,
        archivo_pdf: files.archivo_pdf ? files.archivo_pdf[0].filename : null,
        archivo_sat: files.archivo_sat ? files.archivo_sat[0].filename : null,
      });

      res.status(201).json({ status: "created", data: factura });
    } catch (error) {
      console.error("Error al crear factura:", error);
      res.status(500).json({ status: "server unavailable", error: error.message });
    }
  });
}

export const updateFactura = async (req, res) => {
  try {
    const factura = await Facturas.findByPk(req.params.id)
    if (factura) {
      await factura.update(req.body)
      res.json({ status: "updated", data: factura })
    } else {
      res.status(404).json({ status: "not found", message: "Factura no encontrada" })
    }
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}

export const deleteFactura = async (req, res) => {
  try {
    const factura = await Facturas.findByPk(req.params.id)
    if (factura) {
      await factura.destroy()
      res.json({ status: "deleted", message: "Factura eliminada exitosamente" })
    } else {
      res.status(404).json({ status: "not found", message: "Factura no encontrada" })
    }
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}