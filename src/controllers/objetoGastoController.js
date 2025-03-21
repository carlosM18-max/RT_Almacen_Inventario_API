import ObjetoGastos from "../models/tb_ObjetoGasto.js";

// TODO: Controlador de ObjetoGastos terminado

export const getAllObjetoGastos = async (req, res) => {
    try {
        const objetoGastos = await ObjetoGastos.findAll();
        res.json(objetoGastos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
        const {
            numero_partida,
            nombre,
            descripcion
        } = req.body;
        
        const newObjetoGasto = await ObjetoGastos.create({
            numero_partida,
            nombre,
            descripcion
        }
        );
        res.status(201).json(newObjetoGasto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateObjetoGasto = async (req, res) => {
    try {
        const {
            numero_partida,
            nombre,
            descripcion
        } = req.body;
        const objetoGasto = await ObjetoGastos.findByPk(req.params.id);
        if (objetoGasto) {
            objetoGasto.numero_partida = numero_partida;
            objetoGasto.nombre = nombre;
            objetoGasto.descripcion = descripcion;
            await objetoGasto.save();
            res.json(objetoGasto);
        } else {
            res.status(404).json({ message: 'Objeto de Gasto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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