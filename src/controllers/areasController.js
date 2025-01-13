import Areas from "../models/tb_Areas.js";

export const getAllAreas = async (req, res) => {
  try {
    const areas = await Areas.findAll();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAreaById = async (req, res) => {
  try {
    const area = await Areas.findByPk(req.params.id);
    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArea = async (req, res) => {
  try {
    const { nombre, estado, abreviatura } = req.body;
    const newArea = await Areas.create({ nombre, estado, abreviatura });
    res.status(201).json(newArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateArea = async (req, res) => {
  try {
    const { nombre, estado, abreviatura } = req.body;
    const updated = await Areas.update(
      { nombre, estado, abreviatura },
      { where: { id: req.params.id } }
    );
    if (updated[0] === 1) {
      const updatedArea = await Areas.findByPk(req.params.id);
      res.json(updatedArea);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArea = async (req, res) => {
  try {
    const deleted = await Areas.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Área eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};