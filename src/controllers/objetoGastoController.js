import ObjetoGastos from "../models/tb_ObjetoGasto.js";

export const getAllObjetoGastos = async (req, res) => {
    const objetoGastos = await ObjetoGastos.findAll();
    res.json(objetoGastos);
};

export const getObjetoGastoById = async (req, res) => {
    try {
        const objetoGasto = await ObjetoGastos.findByPk(req.params.id);
        if (objetoGasto) {
            res.json(objetoGasto);
        } else {
            res.status(404).json({ message: 'Objeto de Gasto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createObjetoGasto = async (req, res) => {
    try {
        const { capitulo, concepto, gestion, especifica, nombre, descripcion } = req.body;
        const newObjetoGasto = await ObjetoGastos.create({ capitulo, concepto, gestion, especifica, nombre, descripcion });
        res.status(201).json(newObjetoGasto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateObjetoGasto = async (req, res) => {
    try {
        const { capitulo, concepto, gestion, especifica, nombre, descripcion } = req.body;
        const updated = await ObjetoGastos.update(
            { capitulo, concepto, gestion, especifica, nombre, descripcion },
            { where: { id: req.params.id } }
        );
        if (updated[0] === 1) {
            const updatedObjetoGasto = await ObjetoGastos.findByPk(req.params.id);
            res.json(updatedObjetoGasto);
        } else {
            res.status(404).json({ message: 'Objeto de Gasto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteObjetoGasto = async (req, res) => {
    try {
        const deleted = await ObjetoGastos.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Objeto de Gasto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Objeto de Gasto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};