import Articulos from "../models/tb_Articulos.js";
import { uploadInventario } from "../middlewares/configStorageFile.js";

export const getAllArticulos = async (req, res) => {
  try {
    const articulos = await Articulos.findAll();
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticuloById = async (req, res) => {
  try {
    const articulo = await Articulos.findByPk(req.params.id);
    if (articulo) {
      res.json(articulo);
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArticulo = (req, res) => {
  uploadInventario.single("fotos_entrada")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    try {
      const { file, body } = req;
      const newArticulo = await Articulos.create({
        ...body,
        fotos_entrada: file ? file.filename : null,
      });
      res.status(201).json(newArticulo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const updateArticulo = async (req, res) => {
  try {
    const updated = await Articulos.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      const updatedArticulo = await Articulos.findByPk(req.params.id);
      res.json(updatedArticulo);
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArticulo = async (req, res) => {
  try {
    const deleted = await Articulos.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Artículo eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};