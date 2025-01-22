import Entregas from "../models/tb_Entregas.js";
import { uploadAlmacen } from "../middlewares/configStorageFile.js";

export const getAllEntregas = async (req, res) => {
  try {
    const entregas = await Entregas.findAll();
    res.json(entregas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEntregaById = async (req, res) => {
  try {
    const entrega = await Entregas.findByPk(req.params.id);
    if (entrega) {
      res.json(entrega);
    } else {
      res.status(404).json({ message: 'Entrega no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEntrega = (req, res) => {
  uploadAlmacen.single("fotos_entrada")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    try {
      const { file, body } = req;
      const newEntrega = await Entregas.create({
        ...body,
        fotos_entrada: file ? file.filename : null,
      });
      res.status(201).json(newEntrega);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const updateEntrega = async (req, res) => {
  try {
    const updated = await Entregas.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      const updatedEntrega = await Entregas.findByPk(req.params.id);
      res.json(updatedEntrega);
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEntrega = async (req, res) => {
  try {
    const deleted = await Entregas.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Entrega eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Entrega no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};