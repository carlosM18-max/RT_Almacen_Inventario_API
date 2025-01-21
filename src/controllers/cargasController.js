import Cargas from "../models/tb_Cargas.js";

export const getAllCargas = async (req, res) => {
  try {
    const cargas = await Cargas.findAll();
    res.json(cargas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCargaById = async (req, res) => {
  try {
    const carga = await Cargas.findByPk(req.params.id);
    if (carga) {
      res.json(carga);
    } else {
      res.status(404).json({ message: 'Carga no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCarga = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const newCarga = await Cargas.create({ nombre, estado });
    res.status(201).json(newCarga);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCarga = async (req, res) => {
  try {
    const updated = await Cargas.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      const updatedCarga = await Cargas.findByPk(req.params.id);
      res.json(updatedCarga);
    } else {
      res.status(404).json({ message: 'Carga no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCarga = async (req, res) => {
  try {
    const deleted = await Cargas.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Carga eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Carga no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};