import Poliza from "../models/tb_Polizas.js";
import Factura from "../models/tb_Facturas.js";
import VidaUtil from "../models/tb_VidaUtil.js";
import { uploadPolicy } from "../middlewares/configStorageFile.js"; 

export const getAllPoliza = async (req, res) => {
  try {
    const polizas = await Poliza.findAll();
    res.json(polizas);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

export const createPoliza = (req, res) => {
  uploadPolicy.single("archivo")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    try {
      const { file, body } = req;
      const newPoliza = await Poliza.create({
        ...body,
        archivo: file ? file.filename : null,
      });
      res.status(201).json(newPoliza);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const updatePoliza = (req, res) => {
  uploadPolicy.single("archivo")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    try {
      const { file, body } = req;
      const updated = await Poliza.update(
        {
          ...body,
          archivo: file ? file.filename : null,
        },
        {
          where: { id: req.params.id },
        }
      );
      if (updated[0] === 1) {
        const updatedPoliza = await Poliza.findByPk(req.params.id);
        res.json(updatedPoliza);
      } else {
        res.status(404).json({ message: "Poliza no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
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
    res.status(500).json({ message: error.message });
  }
};

export const getAllData = async (req, res) => {
  try {
    const [polizas, facturas, vidaUtil] = await Promise.all([
      Poliza.findAll(),
      Factura.findAll(),
      VidaUtil.findAll(),
    ]);

    res.json({ polizas, facturas, vidaUtil });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
}