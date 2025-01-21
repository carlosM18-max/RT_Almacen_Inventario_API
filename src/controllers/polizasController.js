import Facturas from "../models/tb_Facturas.js"
import Politica from "../models/tb_Politicas.js"
import VidaUtil from "../models/tb_VidaUtil.js"
import { uploadPolicy } from "../middlewares/configStorageFile.js"

export const createPolitica = async (req, res) => {
  uploadPolicy.single("archivo")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
    try {
      const { file } = req
      const politica = await Politica.create({
        ...req.body,
        archivo: file ? file.filename : null,
      })

      res.status(201).json({ status: "created", data: politica })
    } catch (error) {
      console.error("Error al crear póliza:", error)
      res.status(500).json({ status: "servidor no disponible", error: error.message })
    }
  })
}

export const getAllPoliticas = async (req, res) => {
  try {
    const politicas = await Politica.findAll()
    res.json({ data: politicas })
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}

export const getPoliticaById = async (req, res) => {
  try {
    const politica = await Politica.findByPk(req.params.id)
    if (politica) {
      res.json({ data: politica })
    } else {
      res.status(404).json({ status: "not found", message: "Política no encontrada" })
    }
  } catch (error) {
    res.status(500).json({ status: "servidor no disponible", error: error.message })
  }
}

export const getAllData = async (req, res) => {
  try {
    const [politicas, facturas, vidaUtil] = await Promise.all([
      Politica.findAll(),
      Facturas.findAll(),
      VidaUtil.findAll(),
    ]);

    res.json({ politicas, facturas, vidaUtil });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
}