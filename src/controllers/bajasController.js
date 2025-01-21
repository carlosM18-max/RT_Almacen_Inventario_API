import Bajas from "../models/tb_Bajas.js";

export const getAllBajas = async (req, res) => {
  try {
    const bajas = await Bajas.findAll();
    res.json(bajas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBajaById = async (req, res) => {
  try {
    const baja = await Bajas.findByPk(req.params.id);
    if (baja) {
      res.json(baja);
    } else {
      res.status(404).json({ message: 'Baja no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBaja = (req, res) => {
  upload.single("archivo")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    try {
      const { file, body } = req;
      const newBaja = await Bajas.create({
        ...body,
        archivo: file ? file.filename : null,
      });
      res.status(201).json(newBaja);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const updateBaja = (req, res) => {
  upload.single("archivo")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    try {
      const { file, body } = req;
      const updated = await Bajas.update(
        {
          ...body,
          archivo: file ? file.filename : null,
        },
        {
          where: { id: req.params.id },
        }
      );
      if (updated[0] === 1) {
        const updatedBaja = await Bajas.findByPk(req.params.id);
        res.json(updatedBaja);
      } else {
        res.status(404).json({ message: "Baja no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const deleteBaja = async (req, res) => {
  try {
    const deleted = await Bajas.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Baja eliminada exitosamente" });
    } else {
      res.status(404).json({ message: "Baja no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
