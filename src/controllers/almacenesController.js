import Almacenes from "../models/tb_Almacenes.js";

export const getAllAlmacenes = async (req, res) => {
  try {
    const almacenes = await Almacenes.findAll();
    res.json(almacenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlmacenById = async (req, res) => {
  try {
    const almacen = await Almacenes.findByPk(req.params.id);
    if (almacen) {
      res.json(almacen);
    } else {
      res.status(404).json({ message: 'Almacén no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAlmacen = async (req, res) => {
  try {
    const {
      tipo_adquisicion,
      nombre,
      fecha_entrega,
      fecha_salida,
      tipo_activo,
      codigo_armonizable,
      registro_contable,
      cantidad,
      locacion,
      estado,
      motivo,
      orden_entrega,
      id_inventario,
      id_factura,
      id_solicitud,
      id_poliza
    } = req.body;

    // Crear nuevo Almacen
    const newAlmacen = await Almacenes.create({
      tipo_adquisicion,
      nombre,
      fecha_entrega,
      fecha_salida,
      tipo_activo,
      codigo_armonizable,
      registro_contable,
      cantidad,
      locacion,
      estado,
      motivo,
      orden_entrega,
      id_inventario,
      id_factura,
      id_solicitud,
      id_poliza
    });

    res.status(201).json(newAlmacen);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updateAlmacen = async (req, res) => {
  try {
    const updated = await Almacenes.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      const updatedAlmacen = await Almacenes.findByPk(req.params.id);
      res.json(updatedAlmacen);
    } else {
      res.status(404).json({ message: 'Almacén no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAlmacen = async (req, res) => {
  try {
    const deleted = await Almacenes.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Almacén eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Almacén no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};