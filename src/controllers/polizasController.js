import Facturas from "../models/tb_Facturas.js"
import Polizas from "../models/tb_Polizas.js"
import VidaUtil from "../models/tb_VidaUtil.js"
import { uploadPolicy } from "../middlewares/configStorageFile.js"

export const createPoliza = async (req, res) => {
  uploadPolicy.single("archivo")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
    try {
      const { file } = req
      const polizas = await Polizas.create({
        ...req.body,
        archivo: file ? file.filename : null,
      })

      res.status(201).json({ status: "created", data: polizas })
    } catch (error) {
      console.error("Error al crear póliza:", error)
      res.status(500).json({ status: "servidor no disponible", error: error.message })
    }
  })
}

export const getAllPoliza = async (req, res) => {
  try {
    const polizas = await Polizas.findAll()
    res.json({ data: polizas })
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}

export const getPolizaById = async (req, res) => {
  try {
    const polizas = await Polizas.findByPk(req.params.id)
    if (polizas) {
      res.json({ data: polizas })
    } else {
      res.status(404).json({ status: "not found", message: "Política no encontrada" })
    }
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}

export const getAllData = async (req, res) => {
  try {
    const [polizas, facturas, vidaUtil] = await Promise.all([
      Polizas.findAll(),
      Facturas.findAll(),
      VidaUtil.findAll(),
    ]);

    res.json({ polizas, facturas, vidaUtil });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
}