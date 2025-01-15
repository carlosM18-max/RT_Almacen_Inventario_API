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
        descripcion,
        tipo,
        fecha_entrega,
        fecha_salida,
        tipo_activo,
        codigo_armonizable,
        registro_contable,
        cantidad,
        locacion,
        estado,
        numero_serie,
        motivo,
        tipo_resguardo,
        id_articulo,
        id_factura,
        id_poliza,
        orden_entrega
      } = req.body;
  
      // Generar numero_almacen
      const lastAlmacen = await Almacenes.findOne({
        order: [['numero_almacen', 'DESC']],
        attributes: ['numero_almacen']
      });
      let newAlmacenNumber = 'NA-000001';
      if (lastAlmacen && lastAlmacen.numero_almacen) {
        const lastNumber = parseInt(lastAlmacen.numero_almacen.split('-')[1]);
        newAlmacenNumber = `NA-${(lastNumber + 1).toString().padStart(6, '0')}`;
      }
  
      // Generar numero_inventario
      const prefijo = tipo_adquisicion.charAt(0).toUpperCase();
      const lastInventario = await Almacenes.findOne({
        order: [['numero_inventario', 'DESC']],
        attributes: ['numero_inventario']
      });
      let newInventarioNumber = `${prefijo}-000001`;
      if (lastInventario && lastInventario.numero_inventario) {
        const lastNumber = parseInt(lastInventario.numero_inventario.split('-')[1]);
        newInventarioNumber = `${prefijo}-${(lastNumber + 1).toString().padStart(6, '0')}`;
      }
  
      // Crear nuevo Almacen
      const newAlmacen = await Almacenes.create({
        tipo_adquisicion,
        nombre,
        descripcion,
        tipo,
        fecha_entrega,
        fecha_salida,
        tipo_activo,
        codigo_armonizable,
        registro_contable,
        cantidad,
        locacion,
        estado,
        numero_serie,
        numero_almacen: newAlmacenNumber,
        numero_inventario: newInventarioNumber,
        motivo,
        tipo_resguardo,
        id_articulo,
        id_factura,
        id_poliza,
        orden_entrega
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

